import React from "react";
import { getMyTeams } from "../http/api";
import { useQuery } from "@tanstack/react-query";
import useNavigation from "../utils/navigation";
import { Button } from "@/components/ui/button";
import TeamCard from "@/components/TeamCard";
import { useAuthStore } from "@/store/store";
import { toast } from "sonner";

async function getMyAllTeams() {
  const { data } = await getMyTeams().then((res) => res.data);
  return data;
}

export default function UserTeams() {
  const { gotoMyTeam, gotoCreateTeam } = useNavigation();
  const { user } = useAuthStore();

  const { data: myTeams, isLoading } = useQuery({
    queryKey: ["myTeams"],
    queryFn: getMyAllTeams,
  });

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center gap-2 text-xl text-black m-auto h-screen">
      <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6 justify-between flex items-center">
        {"My Teams : "}
        <Button onClick={() =>
          user.enrolledCourses.length <= myTeams.length
            ? toast.error("You can't be in teams more than enrolled courses")
            : gotoCreateTeam()
        }>Create Team</Button>
      </h1>
      {myTeams.length === 0 ? (
        <div className="text-gray-500 italic text-xl text-center flex items-center justify-center h-[50vh] select-none">
          No team yet
          <br />
          Create a new team or browse and join existing teams
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {myTeams.map((team) => (
            <TeamCard
              key={team.team.id}
              team={team.team}
              role={team.role}
              onClick={() => gotoMyTeam(team.team.id)}
              showRequestButton={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
