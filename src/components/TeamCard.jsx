import React, { useEffect, useState } from 'react';
import useNavigation from '../utils/navigation';
import { Chip } from './Chip';
import { useAuthStore } from '../store/store';

export default function TeamCard({ team }) {
  const [isRequested, setIsRequested] = useState(false);
  const { gotoTeamDetails } = useNavigation();
  const { user } = useAuthStore();

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
          <span>{team?._count?.members} members</span>
        </div>
        <button
          onClick={() => gotoTeamDetails(team.id)}
          disabled={isRequested}
          className={`w-full py-2 rounded-md border text-sm transition border-amber-700 text-white hover:bg-amber-700 hover:border-amber-500 ${
            isRequested ? 'bg-gray-500 cursor-not-allowed hover:bg-gray-500' : 'focus:outline-none'
          }`}
        >
          {isRequested ? 'Requested' : 'View Team'}
        </button>
      </div>
    </div>
  );
}
