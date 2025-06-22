import { useState } from 'react';
import TeamCard from '../components/TeamCard';
import { mockTeams } from '../utils/mockData';
import { useQuery } from '@tanstack/react-query';
import { getAllTeam } from '../http/api';


async function getTeams() {
  const { data } = await getAllTeam().then((res) => res.data);
  return data; 
}

export default function BrowseTeams() {
  const [category, setCategory] = useState('')
  const allTeams = mockTeams
  const filteredTeams = category
    ? allTeams.filter(team => team.category === category)
    : allTeams


  const { data: allTeamData } = useQuery({
    queryKey: ["team"],
    queryFn: getTeams,
  })

  console.log(allTeamData);


  return (
    <div className="min-h-screen w-full overflow-y-auto bg-gray-900 text-white p-6 box-border">
      <h1 className="text-3xl font-bold mb-6">Browse Teams</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search teams"
          className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
        />
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
        >
          <option value="">Category</option>
          <option value="tech">Tech</option>
          <option value="design">Design</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allTeamData?.map((team, index) => (
          <TeamCard key={index} team={team} />
        ))}
      </div>
    </div>
  )
}
