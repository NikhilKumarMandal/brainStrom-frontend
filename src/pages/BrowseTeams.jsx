import { useState } from 'react';
import TeamCard from '../components/TeamCard';
import { useQuery } from '@tanstack/react-query';
import { getAllTeam } from '../http/api';
import CourseSelector from '../components/CourseSelector';
import { useAuthStore } from '../store/store';

async function getTeams() {
  const { data } = await getAllTeam().then((res) => res.data);
  return data;
}

export default function BrowseTeams() {
  const [course, setCourse] = useState('')
  const { data: allTeamData, isLoading } = useQuery({
    queryKey: ["team"],
    queryFn: getTeams,
  })

  const user = useAuthStore((state) => state.user)

  if (isLoading) {
    return <div className="text-white p-6">Loading teams...</div>
  }

  const filteredTeams = allTeamData?.filter((team) => team.leaderId !== user.id)

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-gray-900 text-white p-6 box-border">
      <h1 className="text-3xl font-bold mb-6">Browse Teams</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search teams"
          className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-amber-500"
        />
        <div className="relative inline-block w-[150px]">
          <CourseSelector course={course} setCourse={setCourse} showError={false} showHint={false} />
        </div>
      </div>

      {
        filteredTeams?.length === 0 ? (
          <div className="text-gray-400 p-6 italic">No teams found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTeams?.map((team, index) => (
              <TeamCard key={index} team={team} />
            ))}
          </div>
        )
      }
    </div>
  )
}
