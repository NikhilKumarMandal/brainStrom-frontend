import React from 'react'
import { getMyTeams } from '../http/api';
import { useQuery } from '@tanstack/react-query';
import TeamCard from '../components/TeamCard';
import useNavigation from '../utils/navigation';
import { useAuthStore } from '../store/store';

async function getMyAllTeams() {
  const { data } = await getMyTeams().then((res) => res.data).catch((err) => console.log(err));
  return data
}

export default function MyTeams() {

  const { gotoMyTeam, gotoCreateTeam } = useNavigation()

  const { data: myTeams, isLoading } = useQuery({
    queryKey: ['myTeams'],
    queryFn: getMyAllTeams,
  })

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center gap-2 text-xl text-white m-auto h-screen">
      <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
      Loading...
    </div>
  )
  
  return (
    <div className='p-6 w-full'>
      <h1 className='text-3xl font-bold mb-6 justify-between flex items-center'>
        {'My Teams : '}
        <button onClick={() => gotoCreateTeam()}
          className='bg-amber-700 text-sm align-middle text-white px-4 py-2 rounded-lg'>
          Create Team
        </button>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {myTeams.map((team) => (
          <TeamCard key={team.team.id} team={team.team} role={team.role} onClick={() => gotoMyTeam(team.team.id)} />
        ))}
      </div>
    </div>
  )
}
