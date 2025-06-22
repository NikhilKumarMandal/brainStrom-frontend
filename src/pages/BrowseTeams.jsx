import { useState } from 'react';
import TeamCard from '../components/TeamCard';
import { mockTeams } from '../utils/mockData';
import { useQuery } from '@tanstack/react-query';
import { getAllTeam } from '../http/api';
import { FaChevronDown } from "react-icons/fa6";

async function getTeams() {
  const { data } = await getAllTeam().then((res) => res.data);
  return data;
}

export default function BrowseTeams() {
  const allTeams = mockTeams
  const [category, setCategory] = useState('')
  
  const filteredTeams = category
    ? allTeams.filter(team => team.category === category)
    : allTeams

  const { data: allTeamData } = useQuery({
    queryKey: ["team"],
    queryFn: getTeams,
  })

  console.log(allTeamData)

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-gray-900 text-white p-6 box-border">
      <h1 className="text-3xl font-bold mb-6">Browse Teams</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search teams"
          className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-amber-500"
        />
        <div className="relative inline-block w-[100px]">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none"
          >
            <option value="">All</option>
            <option value="tech">Tech</option>
            <option value="design">Design</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
            <FaChevronDown className="text-md" />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allTeamData?.map((team, index) => (
          <TeamCard key={index} team={team} />
        ))}
      </div>
    </div>
  )
}
