import React, { useState, useEffect, useRef } from 'react'
import RichTextEditor from '../components/RichTextEditor'
import { Chip } from '../components/Chip'
import AuditLogCard from '../components/AuditLogCard'
import TeamMemberDetails from '../components/TeamMemberDetails'
import TeamHeader from '../components/TeamHeader'
import { EditNoticeModal, JoinRequestsModal, MembersModal } from '../components/MyTeamModels'
import { getTeamById, getTeamRequests, respondRequest } from '../http/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../store/store'

async function getTeamDetails(teamId) {
  const { data } = await getTeamById(teamId)
  return data.data
}

export default function MyTeam() {
  const [openModal, setOpenModal] = useState(null)
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null)
  const dropdownRef = useRef(null)
  const { user } = useAuthStore()

  const teamId = 'f0d90e1c-3207-478e-97cf-4965a70d0101'

  const { data: team, isLoading } = useQuery({
    queryKey: [teamId],
    queryFn: () => getTeamDetails(teamId),
  })

  const { data: joinRequests = [], refetch: refetchRequests } = useQuery({
    queryKey: ['joinRequests', teamId],
    queryFn: async () => {
      const res = await getTeamRequests(teamId);
      return res.data.data; // ✅ this gives you the array
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

  const handleAccept = (requestId) => {
    respondMutation.mutate({ requestId, accept: 'accepted' })
  }

  const handleReject = (requestId) => {
    respondMutation.mutate({ requestId, accept: 'rejected' })
  }

  function onNotificationClick() {
    setOpenModal('notifications')
  }

  function toggleDropdown(index) {
    setDropdownOpenIndex((prev) => (prev === index ? null : index))
  }

  function handleSeeProfile(member) {
    alert(`Viewing profile of ${member.name}`)
  }

  function handleKick(member) {
    alert(`Kicked ${member.name}`)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpenIndex(null)
      }
    }

    if (dropdownOpenIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpenIndex])

  const isLeader = user.id == team?.leaderId

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-xl text-white m-auto h-screen">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        Loading...
      </div>
    )

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-6 flex flex-col gap-6 overflow-y-auto">

      {/* NoticeBoard */}
      <div className="w-full min-h-[50%] bg-gray-800 p-6 rounded-lg shadow-2xl flex items-center justify-center">
        <h2 className="text-2xl font-bold absolute top-6">Noticeboard :</h2>
        <RichTextEditor content={team?.notice} readOnly height="90%" />
      </div>

      <TeamHeader
        name={team.name}
        isLeader={isLeader}
        onEditClick={() => setOpenModal('edit')}
        onNotifyClick={onNotificationClick}
      />

      <div className="flex flex-wrap gap-2">
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
            />
          ))}
        </span>
      </div>

      <div className="absolute right-6 bottom-6 w-1/3 h-[34%]">
        <AuditLogCard auditLogs={team.auditLogs} className="w-full h-full" />
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {openModal === 'edit' && (
            <EditNoticeModal
              content={team.notice}
              onUpdate={() => {
                alert('to be handled')
              }}
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
              onAccept={handleAccept}
              onReject={handleReject}
              onClose={() => setOpenModal(null)}
            />
          )}
        </div>
      )}
    </div>
  )
}
