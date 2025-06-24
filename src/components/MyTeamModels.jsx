import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import RichTextEditor from './RichTextEditor'

export function EditNoticeModal({ content, onUpdate, onClose, onDelete }) {
  const [updatedContent, setUpdatedContent] = useState(content)
  return (
    <div className="bg-gray-800 px-6 pt-4 pb-12 rounded-lg shadow-lg w-full max-w-md h-3/4 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 p-2 text-gray-400 border-none hover:text-white focus:outline-none"
      >
        <CgClose className="text-2xl" />
      </button>

      <h3 className="text-xl font-bold">Edit Notice</h3>
      <div className="mt-4 h-[85%]">
        <RichTextEditor
          content={updatedContent}
          onChange={setUpdatedContent}
          height="100%"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={onDelete}
          disabled={!content}
          className="px-5 py-1 mt-3 mr-3 rounded-full border-none bg-amber-700 hover:bg-amber-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Delete
        </button>
        <button
          onClick={() => {
            const plainText = updatedContent.replace(/<[^>]*>/g, '').trim(); // Remove HTML tags & trim
            if (updatedContent === content) {
              alert('Cannot save existing notice');
            } else if (plainText !== '') {
              onUpdate(updatedContent);
            } else {
              alert('Notice content cannot be empty or just spaces');
            }
          }}
          className="px-5 py-1 mt-3 rounded-full border-none bg-green-600 hover:bg-green-500 text-sm"
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
            <div className="font-semibold justify-between">
              {m.user.name}{' '}
              {m.role === 'LEADER' && (
                <span className="text-xs text-green-400"> ( Leader )</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function JoinRequestsModal({ joinRequests, onHandleRequest, onClose }) {
  console.log('joinRequests', joinRequests);

  return (
    <div className="bg-gray-800 px-6 pt-4 pb-12 rounded-lg shadow-lg w-full max-w-md h-3/4 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 p-2 text-gray-400 border-none hover:text-white focus:outline-none"
      >
        <CgClose className="text-2xl" />
      </button>

      <h3 className="text-xl font-bold mb-4 text-amber-400">Join Requests</h3>

      <ul className="text-gray-300 space-y-3 overflow-y-auto max-h-[80%] pr-1">
        {(joinRequests || []).map((req, idx) => (
          <li key={req.id || idx} className="bg-gray-700 p-3 rounded-md">
            <div className="flex justify-between items-center">
              <span>{req.user.name} requested to join your team</span>
              <div className="flex gap-2">
                <button
                  className="bg-green-600 px-3 py-1 rounded-md text-sm hover:bg-green-500"
                  onClick={() => { onHandleRequest(req.id, "ACCEPTED"); console.log('accepted') }}
                >
                  Accept
                </button>
                <button
                  className="bg-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-500"
                  onClick={() => { onHandleRequest(req.id, "REJECTED"); console.log('rejected') }}
                >
                  Reject
                </button>
              </div>
            </div>
          </li>
        ))}
        {(!joinRequests || joinRequests.length === 0) && (
          <p className="text-gray-400 italic">No join requests.</p>
        )}
      </ul>
    </div>
  )
}

export function DisbandConfirm({ teamId, onCancel, disbandReason, setDisbandReason, disbandMutation }) {
  return (
    <div className="bg-gray-800 px-6 py-6 rounded-lg shadow-xl w-full max-w-md">
      <h3 className="text-xl font-bold text-red-500 mb-4">Are you sure you want to disband the team?</h3>
      <p className="text-sm text-gray-400 mb-2">This action cannot be undone.</p>

      <textarea
        placeholder="Enter reason for disbanding"
        value={disbandReason}
        onChange={(e) => setDisbandReason(e.target.value)}
        className="w-full p-2 rounded-md bg-gray-700 text-white mb-4"
      />

      <div className="flex justify-end gap-3">
        <button
          className="text-sm px-4 py-1 bg-gray-700 hover:bg-gray-600 rounded-md"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="text-sm px-4 py-1 bg-red-600 hover:bg-red-500 rounded-md"
          disabled={!disbandReason || disbandMutation.isPending}
          onClick={() => disbandMutation.mutate({ teamId, reason: disbandReason })}
        >
          {disbandMutation.isPending ? 'Disbanding...' : 'Confirm Disband'}
        </button>
      </div>
    </div>
  )
}

export function KickMemberModal({ kickReason, setKickReason, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm space-y-4 text-white">
        <h2 className="text-lg font-semibold text-red-400">Reason for kicking member</h2>
        <textarea
          value={kickReason}
          onChange={(e) => setKickReason(e.target.value)}
          placeholder="Enter reason..."
          className="w-full h-24 p-2 bg-gray-700 rounded focus:outline-none placeholder-gray-400"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border bg-gray-700 border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 border border-red-500 bg-red-600 hover:bg-red-500 text-white rounded-lg"
          >
            Confirm Kick
          </button>
        </div>
      </div>
    </div>
  )
}
