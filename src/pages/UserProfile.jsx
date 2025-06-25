import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../store/store'
import { getUserById, updateProfileLinks } from '../http/api'
import AuditLogCard from '../components/AuditLogCard'
import getRandomImage from '../utils/getRandomImage'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { CiEdit } from 'react-icons/ci'
import EditLinksModal from '../components/EditLinkModel'

function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export default function ProfilePage({ isMe = false }) {
  const { userId } = useParams()
  const { user: authUser } = useAuthStore()
  const queryClient = useQueryClient()
  const [links, setLinks] = useState({
    gitHubLink: '',
    linkedinLink: '',
    hashnodeLink: '',
    xLink: '',
    otherLink: ''
  })
  console.log(authUser.id);
  
  const userQuery = useQuery({
    queryKey: ['profile', isMe ? authUser.id : userId],
    queryFn: () => getUserById(isMe ? authUser.id : userId).then(res => res.data.data),
    enabled: !isMe || !!authUser?.id,
    staleTime: 5 * 60 * 1000
  })

  const user = userQuery.data

  const [showEditModal, setShowEditModal] = useState(false);
  const mutation = useMutation({
    mutationFn: (links) => updateProfileLinks(
      links.gitHubLink,
      links.linkedinLink,
      links.xLink,
      links.hashnodeLink,
      links.otherLink
    ),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', authUser.id]);
      setShowEditModal(false);
    },
    onError: () => alert('Enter valid URL')
  });


  function handleSubmit() {
    const validLinks = {}
    Object.entries(links).forEach(([key, value]) => {
      if (value && isValidUrl(value)) validLinks[key] = value
    })
    if (Object.keys(validLinks).length === 0) {
      alert('Please enter at least one valid URL')
      return
    }
    mutation.mutate(validLinks)
  }

  if (!user || userQuery.isLoading)
    return <div className="text-white p-8">Loading profile...</div>
  if (userQuery.isError)
    return <div className="text-red-400 p-8">Failed to load profile.</div>

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-6 flex flex-col gap-6 overflow-y-auto">
      <div className="flex items-center gap-8">
        <img src={user.avatar || getRandomImage()} alt="avatar" className="w-28 h-28 rounded-full border-2 border-gray-700" />
        <span>
          <h1 className="text-3xl font-bold">{user.name}</h1>
        </span>
      </div>
      {/* <div className="flex gap-8 flex-1 h-[calc(100vh-12rem)]">
        <div className="flex flex-col gap-8 flex-1 h-full">
          <div className="bg-gray-800 rounded-lg p-6 w-full">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Courses Enrolled</h2>
            <ul className="list-disc ml-6 space-y-1 text-gray-300">
              {(user.enrolledCourses || []).map((c, i) => (
                <li key={i}>{c.course.name}</li>
              ))}
            </ul>
          </div>
        </div>
        </div> */}
      <div className="flex gap-8 flex-1 h-[calc(100vh-12rem)]">
        <div className="flex flex-col gap-8 flex-1 h-full">
          <div className="relative bg-gray-800 rounded-lg p-6 w-full flex-1">
            {isMe && (
              <button
                onClick={() => setShowEditModal(true)}
                className="text-sm px-4 py-1 bg-amber-700 hover:bg-amber-600 rounded-md absolute top-2 right-2 flex items-center gap-1"
              >
                update links <CiEdit />
              </button>
            )}
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Links</h2>
            <div className="space-y-2 text-gray-300">
              {['gitHubLink', 'linkedinLink', 'hashnodeLink', 'xLink', 'otherLink'].map((key) => (
                user[key] && (
                  <p key={key} className="flex items-center gap-2">
                    <span className="text-gray-400">{key.replace('Link', '')}:</span>
                    <span className="truncate">{user[key]}</span>
                    <a href={user[key]} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt className="text-blue-400 hover:text-blue-300 cursor-pointer" />
                    </a>
                  </p>
                )
              ))}
              {!user.gitHubLink && !user.linkedinLink && !user.hashnodeLink && !user.xLink && !user.otherLink && (
                <p className="text-gray-500 italic">No links added.</p>
              )}
            </div>
          </div>
        </div>

        <AuditLogCard auditLogs={user.auditLogs || []} className="w-1/2 h-full" />
      </div>

      {showEditModal && (
        <EditLinksModal
          defaultLinks={user}
          onClose={() => setShowEditModal(false)}
          onSubmit={(data) => mutation.mutate(data)}
        />
      )}

    </div>
  )
}
