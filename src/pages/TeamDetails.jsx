import React, { useState } from 'react'

export default function TeamDetails() {
  const [showDialog, setShowDialog] = useState(false)
  const [reason, setReason] = useState('')

  const members = 12

  const handleSendRequest = () => {
    console.log('Reason to join:', reason)
    setShowDialog(false)
    setReason('')
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="self-start text-gray-400 hover:text-white text-lg mb-6 bg-transparent"
      >
        ← Back
      </button>

      {/* Team Details Card */}
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold text-gray-200">React Wizards</h1>
        <p className="text-lg text-gray-400">{members} members</p>

        <p className="text-gray-400">
          A team dedicated to mastering React and building real-world projects together.
        </p>

        <div className="flex flex-wrap gap-2">
          {['Web Dev', 'React', 'Open Source'].map(tag => (
            <span
              key={tag}
              className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => setShowDialog(true)}
          className="w-full py-2 rounded-md border text-sm transition border-gray-500 text-white hover:bg-gray-700"
        >
          Request to Join
        </button>
      </div>

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">Why do you want to join this team?</h2>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Write your reason here..."
              className="w-full h-32 p-3 bg-gray-700 text-white rounded-lg resize-none placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 border bg-gray-700 border-gray-600 rounded-lg text-gray-400 hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSendRequest}
                className="w-full py-2 rounded-lg border text-sm transition border-gray-500 text-white hover:bg-gray-700"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
