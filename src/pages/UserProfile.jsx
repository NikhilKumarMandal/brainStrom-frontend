import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../store/store'
import { getUserById } from '../http/api'
import AuditLogCard from '../components/AuditLogCard'
import getRandomImage from '../utils/getRandomImage'
import { FaExternalLinkAlt } from 'react-icons/fa'

export default function ProfilePage({ isMe = false }) {
  const { userId } = useParams()
  const { user: authUser } = useAuthStore()

  const userQuery = useQuery({
    queryKey: ['profile', isMe ? authUser.id : userId],
    queryFn: () => getUserById(isMe ? authUser.id : userId).then(res => res.data.data),
    enabled: !isMe || !!authUser?.id,
    staleTime: 5 * 60 * 1000
  })

  const user = isMe ? authUser : userQuery.data

  if (!user || userQuery.isLoading) return
    <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"/>

  if (userQuery.isError) return
    <div className="text-red-400 p-8">Failed to load profile.</div>

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-6 flex flex-col gap-6 overflow-y-auto">
      <div className="flex items-center gap-8">
        <img
          src={user.avatar || getRandomImage()}
          alt="avatar"
          className="w-28 h-28 rounded-full border-2 border-gray-700"
        />
        <span>
          <h1 className="text-3xl font-bold">{user.name}</h1>
        </span>
      </div>

      <div className="flex gap-8 flex-1 h-[calc(100vh-12rem)]">
        <div className="flex flex-col gap-8 flex-1 h-full">
          {isMe &&
            <div className="bg-gray-800 rounded-lg p-6 w-full">
              <h2 className="text-xl font-semibold text-amber-400 mb-4">Courses Enrolled</h2>
              <ul className="list-disc ml-6 space-y-1 text-gray-300">
                {(user.enrolledCourses || []).map((c, i) => (
                  <li key={i}>{c.course.name}</li>
                ))}
              </ul>
            </div>
          }
          <div className="bg-gray-800 rounded-lg p-6 w-full flex-1">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Links</h2>
            <div className="space-y-2 text-gray-300">
              {user.gitHubLink && (
                <p className="flex items-center gap-2">
                  <span className="text-gray-400">GitHub:</span>
                  <span className="truncate">{user.gitHubLink}</span>
                  <a href={user.gitHubLink} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt className="text-blue-400 hover:text-blue-300 cursor-pointer" />
                  </a>
                </p>
              )}
              {user.linkedinLink && (
                <p className="flex items-center gap-2">
                  <span className="text-gray-400">LinkedIn:</span>
                  <span className="truncate">{user.linkedinLink}</span>
                  <a href={user.linkedinLink} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt className="text-blue-400 hover:text-blue-300 cursor-pointer" />
                  </a>
                </p>
              )}
              {user.hashnodeLink && (
                <p className="flex items-center gap-2">
                  <span className="text-gray-400">Hashnode:</span>
                  <span className="truncate">{user.hashnodeLink}</span>
                  <a href={user.hashnodeLink} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt className="text-blue-400 hover:text-blue-300 cursor-pointer" />
                  </a>
                </p>
              )}
              {user.xLink && (
                <p className="flex items-center gap-2">
                  <span className="text-gray-400">X (Twitter):</span>
                  <span className="truncate">{user.xLink}</span>
                  <a href={user.xLink} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt className="text-blue-400 hover:text-blue-300 cursor-pointer" />
                  </a>
                </p>
              )}
              {user.otherLink && (
                <p className="flex items-center gap-2">
                  <span className="text-gray-400">Other:</span>
                  <span className="truncate">{user.otherLink}</span>
                  <a href={user.otherLink} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt className="text-blue-400 hover:text-blue-300 cursor-pointer" />
                  </a>
                </p>
              )}
              {!user.gitHubLink && !user.linkedinLink && !user.hashnodeLink && !user.xLink && !user.otherLink && (
                <p className="text-gray-500 italic">No links added.</p>
              )}
            </div>
          </div>
        </div>
        
        <AuditLogCard auditLogs={user.auditLogs || []} className="w-1/2 h-full" />
      </div>
    </div>
  )
}
