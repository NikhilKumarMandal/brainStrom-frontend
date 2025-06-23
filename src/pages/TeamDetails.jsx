import React, { useState } from 'react'
import { Chip } from '../components/Chip'
import { useParams } from 'react-router-dom'
import { getTeamById, requestJoinTeam } from '../http/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import useNavigation from '../utils/navigation'

async function getTeamDetails(teamId) {
  const { data } = await getTeamById(teamId).then((res) => res.data).catch((err) => console.log(err))
  return data
}

export default function TeamDetails() {
  const [showDialog, setShowDialog] = useState(false)
  const [showWarningDialog, setShowWarningDialog] = useState(false)
  const [description, setDescription] = useState('')
  const { teamId } = useParams()

  const { gotoHomePage } = useNavigation()

  const { data: team, isLoading } = useQuery({
    queryKey: [teamId],
    queryFn: () => getTeamDetails(teamId),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ teamId, description }) => {
      console.log(teamId, description);
      const { data } = await requestJoinTeam(teamId, description)
      return data
    },
    onSuccess: () => {
      alert('Submitted')
      gotoHomePage()
    },
    onError: () => {
      alert('Failed to submit ticket')
    }
  })

  // console.log(teamId, description)

  const handleSendRequest = () => {
    if (description.trim() === '') {
      setShowWarningDialog(true)
      return
    }

    console.log('description to join:', description)

    mutate({ teamId, description })
    setShowDialog(false)
    setDescription('')
  }


  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-xl text-white m-auto h-screen">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        Loading...
      </div>
    )

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white relative">
      {/* Back Button pinned to top-left */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 text-gray-400 hover:text-white text-lg bg-transparent border-none focus:outline-none"
      >
        ← Back
      </button>

      {/* Centered Card Container */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl space-y-6">
          
          <h1 className="text-3xl font-bold text-gray-200">{team?.name}</h1>

          <p className="text-lg text-gray-400">Leader: {team?.leader?.name}</p>

          <p className="text-gray-400">
            {team?.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {team?.skills?.map(skill => (
              <Chip key={skill} tag={skill} />
            ))}
          </div>

          <button
            onClick={() => setShowDialog(true)}
            className="w-full py-2 rounded-md border text-sm transition border-gray-500 text-white hover:bg-gray-700"
          >
            Request to Join
          </button>
        </div>
      </div>

      {/* Main Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">Why do you want to join this team?</h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your description here..."
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

      {/* Warning Dialog */}
      {showWarningDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-sm text-center space-y-4">
            <h2 className="text-lg font-semibold text-red-400">
              You can't join without a proper description
            </h2>
            <button
              onClick={() => setShowWarningDialog(false)}
              className="px-4 py-2 mt-2 border bg-gray-700 border-gray-600 rounded-lg text-white hover:bg-gray-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
