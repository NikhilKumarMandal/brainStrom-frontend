import React, { useState, useRef } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Chip } from '../components/Chip'
import { useAuthStore } from '../store/store'
import { deleteNotice, disbandTeam, editNotice, getNotice, getTeamById, getTeamHistory, getTeamRequests, kickMember, leaveTeam, respondRequest } from '../http/api'
import { DisbandConfirm, EditNoticeModal, JoinRequestsModal, MembersModal, KickMemberModal } from '../components/MyTeamModels'
import RichTextEditor from '../components/RichTextEditor'
import AuditLogCard from '../components/AuditLogCard'
import TeamMemberDetails from '../components/TeamMemberDetails'
import useNavigation from '../utils/navigation'
import formatDate from '../utils/formatePostTime'
import LeaveTeamModal from '../components/LeaveTeamModal'

async function getTeamDetails(teamId) {
  const { data } = await getTeamById(teamId)
  return data.data
}

async function getNoticeboard(teamId) {
  const { data } = await getNotice(teamId)
  return data.data?.[0] || null
}

async function getTeamteamLogs(teamId) {
  const { data } = await getTeamHistory(teamId)
  return data.data
}

export default function MyTeam() {
  const [openModal, setOpenModal] = useState(null) // 'edit', 'members', 'notifications', 'kick', 'disband', 'leave'
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null)
  const [disbandReason, setDisbandReason] = useState('')
  const [showLeaderMenu, setShowLeaderMenu] = useState(false)
  const [kickTargetUserId, setKickTargetUserId] = useState(null)
  const [kickReason, setKickReason] = useState('')
  const [leaveReason, setLeaveReason] = useState('')
  const queryClient = useQueryClient()
  const dropdownRef = useRef(null)
  const { user } = useAuthStore()
  const { teamId } = useParams()
  const { gotoHomePage } = useNavigation()

  const { data: team, isLoading: teamLoading } = useQuery({
    queryKey: [teamId],
    queryFn: () => getTeamDetails(teamId)
  })

  const { data: notice, isLoading: noticeLoading } = useQuery({
    queryKey: [teamId, 'notice'],
    queryFn: () => getNoticeboard(teamId)
  })

  const { data: teamLogs, isLoading: teamLogsLoading } = useQuery({
    queryKey: [teamId, 'teamLogs'],
    queryFn: () => getTeamteamLogs(teamId)
  })

  // console.log(notice);
  // console.log(teamLogs);
  // console.log(team);

  const isLeader = user.id == team?.leaderId

  const editNoticeMutation = useMutation({
    mutationFn: ({ teamId, content }) => editNotice(teamId, content),
    onSuccess: () => {
      queryClient.invalidateQueries([teamId, 'notice']);
      setOpenModal(null);
    },
    onError: () => alert('Failed to update notice')
  });

  const deleteNoticeMutation = useMutation({
    mutationFn: ({ noticeId }) => deleteNotice(noticeId),
    onSuccess: async () => {
      await queryClient.invalidateQueries([teamId, 'notice']);
      await queryClient.refetchQueries([teamId, 'notice']);
      setOpenModal(null);
    },

    onError: () => alert('Failed to delete notice')
  });


  const { data: joinRequests = [], refetch: refetchRequests } = useQuery({
    queryKey: ['joinRequests', teamId],
    queryFn: async () => {
      const res = await getTeamRequests(teamId)
      return res.data.data
    },
    enabled: !!teamId && isLeader
  });

  const respondMutation = useMutation({
    mutationFn: ({ requestId, accept }) => respondRequest(requestId, accept),
    onSuccess: (_data, variables) => {
      refetchRequests()
      if (variables.accept) {
        queryClient.invalidateQueries([teamId])
      }
    },
    onError: () => alert('Failed to respond to request')
  });


  const disbandMutation = useMutation({
    mutationFn: ({ teamId, reason }) => disbandTeam(teamId, reason),
    onSuccess: () => {
      alert('Team disbanded successfully')
      window.location.href = '/'
    },
    onError: () => alert('Failed to disband team')
  })

  const leaveMutation = useMutation({
    mutationFn: ({ teamId, reason }) => leaveTeam(teamId, reason),
    onSuccess: () => {
      // alert('You have left the team successfully')
      gotoHomePage()
    },
    onError: () => alert('Failed to leave team')
  })

  const handleRequest = (requestId, accept) => { respondMutation.mutate({ requestId, accept }) }

  function toggleDropdown(index) { setDropdownOpenIndex(prev => (prev === index ? null : index)) }

  function handleSeeProfile(member) { alert(`Viewing profile of ${member.name}`) }

  function handleKick(userId) {
    setKickTargetUserId(userId)
    setKickReason('')
    setOpenModal('kick')
  }

  function confirmKick() {
    if (!kickReason.trim()) {
      alert('Please provide a reason for kicking');
      return;
    }

    kickMember(teamId, kickTargetUserId, kickReason)
      .then(() => {
        setOpenModal(null)
        setKickTargetUserId(null)
        setKickReason('')
        queryClient.invalidateQueries([teamId])
      })
      .catch(err => {
        console.error('Kick error:', err)
        alert('Kick failed')
      })
  }

  function handleLeaveTeam() {
    setOpenModal('leave')
  }

  function confirmLeave() {
    console.log(teamId, leaveReason);
    
    if (!leaveReason.trim()) {
      alert('Please provide a reason for leaving');
      return;
    }
    leaveMutation.mutate({ teamId, reason: leaveReason })
  }

  console.log(leaveReason)


  if (teamLoading) return (
    <div className="flex flex-col items-center justify-center gap-2 text-xl text-white m-auto h-screen">
      <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
      Loading...
    </div>
  )

  const isMember = team?.members?.some(member => member.userId === user.id);
  if (!isMember) gotoHomePage()

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white px-6 py-4 flex flex-col gap-4 overflow-y-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{team.name}</h1>
        {isLeader
          ? (<div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowLeaderMenu(!showLeaderMenu)}
              className="bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded-md text-sm"
            >
              Leader Options
            </button>
            {showLeaderMenu && (
              <div className="absolute top-12 right-0 bg-gray-800 border border-gray-700 rounded-md shadow-lg p-2 w-48 z-10">
                <button onClick={() => { setOpenModal('notifications'); setShowLeaderMenu(false) }} className="w-full text-left px-2 py-1 hover:bg-gray-700 rounded">See Requests</button>
                <button onClick={() => { setOpenModal('edit'); setShowLeaderMenu(false) }} className="w-full text-left px-2 py-1 hover:bg-gray-700 rounded">Edit Notice</button>
                <button onClick={() => { setOpenModal('disband'); setShowLeaderMenu(false) }} className="w-full text-left px-2 py-1 text-red-400 hover:bg-red-800 rounded">Disband Team</button>
              </div>
            )}
          </div>
          )
          : (
            <button
              onClick={handleLeaveTeam}
              className="bg-amber-700 hover:bg-amber-600 px-4 py-2 rounded-md text-sm"
            >
              Leave Team
            </button>
          )}
      </div>

      <div className="w-full h-[50%] bg-gray-800 p-6 rounded-lg shadow-2xl flex items-center justify-center relative">
        <h2 className="text-xl text-gray-500 font-serif absolute top-2 left-4 select-none">Noticeboard :</h2>
        {noticeLoading ? (
          <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
        ) : notice ? (
          <div className="text-gray-500 text-lg font-serif italic h-[90%] overflow-y-auto select-none flex items-center" >
            <RichTextEditor key={notice.updatedAt} content={notice.content} readOnly />
          </div>
        ) : (
          <div className="text-gray-500 text-lg font-serif italic select-none" >No notice yet</div>
        )}
        <h2 className="text-xs text-gray-500 font-sans absolute bottom-2 right-4 select-none">{notice && `Last Updated at ${formatDate(notice?.updatedAt)}`}</h2>
      </div>

      <div className="flex flex-wrap gap-2 w-[50%]">
        {team.skills.map((tag, i) => (
          <Chip key={i} tag={tag} />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h2 onClick={() => setOpenModal('members')} className="w-fit text-lg font-semibold cursor-pointer hover:text-amber-400">
          Members:
        </h2>
        <span className="flex flex-wrap gap-4">
          {team?.members?.map((m, i) => (
            <TeamMemberDetails
              key={i}
              member={m}
              isOpen={dropdownOpenIndex === i}
              onClick={() => toggleDropdown(i)}
              onSeeProfile={handleSeeProfile}
              onKick={handleKick}
              closeDropdown={() => setDropdownOpenIndex(null)}
              isLeader={isLeader}
              leaderId={team.leaderId}
            />
          ))}
        </span>
      </div>

      <div className="absolute right-6 bottom-6 w-1/3 h-[34%]">
        <AuditLogCard
          auditLogs={teamLogs}
          className="w-full h-full"
          isLoading={teamLogsLoading}
          members={team.members}
          fromTeam
          leaderId={team.leaderId}
        />
      </div>

      {(openModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {openModal === 'edit' && (
            <EditNoticeModal
              content={notice?.content}
              onUpdate={(updatedContent) => {
                editNoticeMutation.mutate({ teamId, content: updatedContent });
              }}
              onClose={() => setOpenModal(null)}
              onDelete={() => {
                if (notice?.id) {
                  deleteNoticeMutation.mutate({ noticeId: notice.id });
                }
              }}
            />
          )}

          {openModal === 'members' && (
            <MembersModal
              members={team.members}
              onClose={() => setOpenModal(null)}
            />
          )}

          {openModal === 'notifications' && (
            <JoinRequestsModal
              joinRequests={joinRequests}
              onHandleRequest={handleRequest}
              onClose={() => setOpenModal(null)}
            />
          )}

          {openModal === 'disband' && (
            <DisbandConfirm
              teamId={teamId}
              onCancel={() => setOpenModal(null)}
              disbandReason={disbandReason}
              setDisbandReason={setDisbandReason}
              disbandMutation={disbandMutation}
            />
          )}

          {openModal === 'kick' && (
            <KickMemberModal
              kickReason={kickReason}
              setKickReason={setKickReason}
              onCancel={() => setOpenModal(null)}
              onConfirm={confirmKick}
            />
          )}

          {openModal === 'leave' && (
            <LeaveTeamModal
              leaveReason={leaveReason}
              setLeaveReason={setLeaveReason}
              onCancel={() => setOpenModal(null)}
              onConfirm={confirmLeave}
            />
          )}
        </div>
      )}
    </div>
  )
}