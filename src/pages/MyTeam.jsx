import React, { useState, useEffect, useRef } from 'react'
import RichTextEditor from '../components/RichTextEditor'
import { Chip } from '../components/Chip'
import AuditLogCard from '../components/AuditLogCard'
import TeamMemberDetails from '../components/TeamMemberDetails'
import { DisbandConfirm, EditNoticeModal, JoinRequestsModal, MembersModal } from '../components/MyTeamModels'
import { disbandTeam, getTeamById, getTeamRequests, kickMember, respondRequest } from '../http/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../store/store'
import { useParams } from 'react-router-dom'

async function getTeamDetails(teamId) {
  const { data } = await getTeamById(teamId)
  console.log(data);

  return data.data
}

export default function MyTeam() {
  const [openModal, setOpenModal] = useState(null)
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null)
  const [showDisbandConfirm, setShowDisbandConfirm] = useState(false)
  const [disbandReason, setDisbandReason] = useState('')
  const [showLeaderMenu, setShowLeaderMenu] = useState(false)

  const dropdownRef = useRef(null)
  const { user } = useAuthStore()

  const { id } = useParams()
  const teamId = id
  console.log(id);

  const { data: team, isLoading } = useQuery({
    queryKey: [teamId],
    queryFn: () => getTeamDetails(teamId),
  })

  const { data: joinRequests = [], refetch: refetchRequests } = useQuery({
    queryKey: ['joinRequests', teamId],
    queryFn: async () => {
      const res = await getTeamRequests(teamId);
      return res.data.data;
    },
    enabled: !!teamId,
  });

  const respondMutation = useMutation({
    mutationFn: ({ requestId, accept }) => respondRequest(requestId, accept),
    onSuccess: () => {
      refetchRequests()
    },
    onError: () => {
      alert('Failed to respond to request')
    }
  })

  const disbandMutation = useMutation({
    mutationFn: ({ teamId, reason }) => disbandTeam(teamId, reason),
    onSuccess: () => {
      alert('Team disbanded successfully');
      window.location.href = '/';
    },
    onError: () => {
      alert('Failed to disband team');
    }
  });

  const handleRequest = (requestId, accept) => {
    respondMutation.mutate({ requestId, accept})
  }

  // const handleAccept = (requestId) => {
  //   respondMutation.mutate({ requestId, accept: 'ACCEPTED' })
  // }

  // const handleReject = (requestId) => {
  //   respondMutation.mutate({ requestId, accept: 'REJECTED' })
  // }

  function toggleDropdown(index) {
    setDropdownOpenIndex((prev) => (prev === index ? null : index))
  }

  function handleSeeProfile(member) {
    alert(`Viewing profile of ${member.name}`)
  }

  function handleKick(userId) {
    console.log('kicking', userId);
    kickMember(teamId, userId, 'Testing kick functionality')
      .then(() => alert('Kick API success'))
      .catch((err) => {
        console.error('Kick error:', err)
        alert('Kick failed')
      })
  }

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDropdownOpenIndex(null)
  //       setShowLeaderMenu(false)
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => document.removeEventListener('mousedown', handleClickOutside)
  // }, [])

  const isLeader = user.id == team?.leaderId

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-xl text-white m-auto h-screen">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        Loading...
      </div>
    )

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white px-6 py-4 flex flex-col gap-4 overflow-y-auto">

      {/* Team Name and Leader Controls */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{team.name}</h1>
        {isLeader && (
          <div className="relative" ref={dropdownRef}>
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
                <button onClick={() => { setShowDisbandConfirm(true); setShowLeaderMenu(false) }} className="w-full text-left px-2 py-1 text-red-400 hover:bg-red-800 rounded">Disband Team</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* NoticeBoard */}
      <div className="w-full min-h-[50%] bg-gray-800 p-6 rounded-lg shadow-2xl flex items-center justify-center relative">
        <h2 className="text-2xl font-bold absolute top-2 left-6">Noticeboard :</h2>
        <RichTextEditor content={team?.notice} readOnly height="90%" />
      </div>

      <div className="flex flex-wrap gap-2 w-[50%]">
        {team.skills.map((tag, i) => (
          <Chip key={i} tag={tag} />
        ))}
      </div>

      {/* Member Details */}
      <div className="flex flex-col gap-2">
        <h2
          onClick={() => setOpenModal('members')}
          className="w-fit text-lg font-semibold cursor-pointer hover:text-amber-400"
        >
          Members:
        </h2>

        {/* <button
          onClick={() =>
            kickMember(teamId, 'd439322f-5d83-4174-bc00-3c869e0de71b', 'Testing kick functionality')
              .then(() => alert('Kick API success'))
              .catch((err) => {
                console.error('Kick error:', err)
                alert('Kick failed')
              })
          }
          className="text-sm w-fit px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-md mt-4"
        >
          Test Kick Member
        </button> */}

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
            />
          ))}
        </span>
      </div>

      <div className="absolute right-6 bottom-6 w-1/3 h-[34%]">
        <AuditLogCard auditLogs={team.auditLogs} className="w-full h-full" />
      </div>

      {(openModal || showDisbandConfirm) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {openModal === 'edit' && (
            <EditNoticeModal
              content={team.notice}
              onUpdate={() => alert('to be handled')}
              onClose={() => setOpenModal(null)}
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
              // onAccept={handleAccept}
              // onReject={handleReject}
              onClose={() => setOpenModal(null)}
            />
          )}

          {showDisbandConfirm && (
            <DisbandConfirm
              teamId={teamId}
              setShowDisbandConfirm={setShowDisbandConfirm}
              disbandReason={disbandReason}
              setDisbandReason={setDisbandReason}
              disbandMutation={disbandMutation}
            />
          )}
        </div>
      )}
    </div>
  )
}
