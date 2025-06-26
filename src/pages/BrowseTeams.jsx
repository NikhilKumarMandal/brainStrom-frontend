import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TbPlugConnectedX } from "react-icons/tb";
import { getAllTeam } from "../http/api";
import { useAuthStore } from "../store/store";
import TeamCard from "../components/TeamCard";
import CourseSelector from "../components/CourseSelector";

async function getTeams() {
  const { data } = await getAllTeam().then((res) => res.data);
  return data;
}

export default function BrowseTeams() {
  const [course, setCourse] = useState("");
  const { data: allTeamData, isLoading } = useQuery({
    queryKey: ["team"],
    queryFn: getTeams,
  });

  const { user } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-xl text-white m-auto h-screen">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
        Loading...
      </div>
    );
  }

  const filteredTeams = allTeamData?.filter(
    (team) => team.leaderId !== user.id
  );

  if (!filteredTeams) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 w-full select-none">
        <TbPlugConnectedX className="text-6xl text-amber-500 opacity-50" />
        <p className="text-gray-400 p-6 italic">
          Looks like we ran into some problem
        </p>
      </div>
    );
  }

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
          <CourseSelector
            course={course}
            setCourse={setCourse}
            showError={false}
          />
        </div>
      </div>

      {filteredTeams?.length === 0 ? (
        <div className="text-gray-400 p-6 italic">No team available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTeams?.map((team, index) => (
            <TeamCard key={index} team={team} />
          ))}
        </div>
      )}
    </div>
  );
}
