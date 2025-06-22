import React from 'react'
import AuditLogCard from '../components/AuditLogCard'
import { Chip } from '../components/Chip'
import RichTextEditor from '../components/RichTextEditor'
import { mockProfile } from '../utils/mockData'

export default function ProfilePage() {

  // Yeha API handle karna hai

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-6 flex flex-col gap-6 overflow-y-auto">
      <div className="flex items-center gap-8">
        <img
          src={mockProfile.avatar}
          alt="avatar"
          className="w-28 h-28 rounded-full border-2 border-gray-700"
        />
        <span>
          <h1 className="text-3xl font-bold">{mockProfile.name}</h1>
          <div className="flex gap-2 mt-2">
            {mockProfile.skills.map((skill, i) => (
              <Chip key={i} tag={skill} />
            ))}
          </div>
        </span>
      </div>

      <div className="flex gap-8 flex-1 h-[calc(100vh-12rem)]">
        <div className="flex flex-col gap-8 flex-1 h-full">
          <div className="bg-gray-800 rounded-lg p-6 w-full">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Courses Enrolled</h2>
            <ul className="list-disc ml-6 space-y-1 text-gray-300">
              {mockProfile.courses.map((course, i) => (
                <li key={i}>{course}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 w-full flex-1">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Bio</h2>
            <RichTextEditor readOnly content={mockProfile.bio} padding="p-0" />
          </div>
        </div>

        <AuditLogCard auditLogs={mockProfile.auditLogs} className="w-1/2 h-full" />

      </div>
    </div>
  )
}
