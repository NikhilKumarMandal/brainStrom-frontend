import React from 'react'
import { CgClose } from 'react-icons/cg'
import RichTextEditor from './RichTextEditor'

export function EditNoticeModal({ content, onUpdate, onClose }) {
  return (
    <div className="bg-gray-800 px-6 pt-4 pb-12 rounded-lg shadow-lg w-full max-w-md h-3/4 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 p-2 text-gray-400 border-none hover:text-white focus:outline-none"
      >
        <CgClose className="text-2xl" />
      </button>

      <h3 className="text-xl font-bold">Edit Notice</h3>
      <div className="mt-6 h-[85%]">
        <RichTextEditor
          content={content}
          onUpdate={onUpdate}
          height="100%"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-5 py-1 mt-3 rounded-full border-none bg-amber-700 hover:bg-amber-600 text-sm"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export function MembersModal({ members, onClose }) {
  return (
    <div className="bg-gray-800 px-6 pt-4 pb-12 rounded-lg shadow-lg w-full max-w-md h-3/4 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 p-2 text-gray-400 border-none hover:text-white focus:outline-none"
      >
        <CgClose className="text-2xl" />
      </button>

      <h3 className="text-xl font-bold mb-4">Team Members</h3>
      <ul className="text-gray-300 space-y-3 overflow-y-auto max-h-[80%] pr-1">
        {members.map((m, i) => (
          <li key={i} className="bg-gray-700 p-3 rounded-md">
            <div className="font-semibold">
              {m.name}{' '}
              {m.isLeader && (
                <span className="text-xs text-yellow-400">Leader</span>
              )}
            </div>
            <div className="text-sm text-gray-400">
              Skills: {m.skills.join(', ')}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
