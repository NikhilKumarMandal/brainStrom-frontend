import React from 'react';
import useNavigation from '../utils/navigation';

export default function TeamCard({ team }) {

  const { gotoTeamDetails } = useNavigation()

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md flex flex-col justify-between h-full">
      <div>
        <h2 className="text-lg font-semibold">{team.name}</h2>
        <p className="text-sm text-gray-400 mb-4">{team.description}</p>
      </div>
      <div>
        <div className="flex flex-wrap gap-1 mb-2">
          {team?.skills?.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
          <span>{team?._count?.members} members</span>
          {/* <span className="bg-gray-700 px-2 py-0.5 rounded text-xs">{team.visibility}</span> */}
        </div>
        <button
          onClick={() => gotoTeamDetails(team.id)}
          className={"w-full py-2 rounded-md border text-sm transition border-amber-700 text-white hover:bg-amber-700 hover:border-amber-500"}
        >
          View Team
        </button>
      </div>
    </div>
  )
}
