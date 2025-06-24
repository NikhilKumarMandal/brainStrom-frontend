import React, { useEffect, useState } from 'react';
import useNavigation from '../utils/navigation';
import { Chip } from './Chip';
import { useAuthStore } from '../store/store';
import { useMutation } from '@tanstack/react-query';
import { requestJoinTeam } from '../http/api';

export default function TeamCard({ team, role = null, onClick = null }) {
  const [isRequested, setIsRequested] = useState(false);
  const { user } = useAuthStore();

  const [showDialog, setShowDialog] = useState(false)
  const [showWarningDialog, setShowWarningDialog] = useState(false)
  const [description, setDescription] = useState('')

  const teamId = team.id
  const { gotoHomePage } = useNavigation()

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

  useEffect(() => {
    if (!user?.joinRequestLockAt) return;
    const now = Date.now();
    const diff = now - new Date(user.joinRequestLockAt).getTime();
    if (diff < 10 * 60 * 1000) setIsRequested(true);
  }, [user]);

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md flex flex-col justify-between h-full">
      <div>
        <h2 className="text-lg font-semibold">{team.name}</h2>
        <p
          className="text-sm text-gray-400 mb-4 line-clamp-2"
          title={team.description}
        >
          {team.description}
        </p>
      </div>
      <div>
        <div className="flex flex-wrap gap-1 mb-2">
          {team?.skills?.map((tag, i) => <Chip key={i} tag={tag} />)}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
          <span>{role ? `Role: ${role} ` : `${team?._count?.members} members`}</span>
        </div>
        <button
          onClick={() => onClick ? onClick(team) : setShowDialog(true)}
          disabled={role ? false : isRequested}
          className={`w-full py-2 rounded-md border text-sm transition border-amber-700 text-white hover:bg-amber-700 hover:border-amber-500 ${role ? 'bg-amber-700' : isRequested ? 'bg-gray-500 cursor-not-allowed hover:bg-gray-500 border-none' : 'focus:outline-none'}`}
        >
          {role ? 'View Team' : isPending ? 'Requesting...' : isRequested ? 'Requested' : 'Request to Join'}
        </button>
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
  );
}
