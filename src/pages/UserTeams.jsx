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

  const { data: myTeams = [], isLoading } = useQuery({
    queryKey: ["myTeams"],
    queryFn: getMyAllTeams,
  });


  const enrolledCount = user?.enrolledCourses?.length || 0;
  const canCreateTeam = myTeams?.length < enrolledCount;


  return (
    <div className="p-6 w-full">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">My Teams</h1>
      <Button
        onClick={() => {
          if (!canCreateTeam) {
            toast.error("You can't be in more teams than enrolled courses");
            return;
          }
          gotoCreateTeam();
        }}
      >
        Create Team
      </Button>
    </div>

    {isLoading ? (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="w-12 h-12 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />
      </div>
    ) : myTeams?.length === 0 ? (
      <div className="text-gray-500 italic text-xl text-center flex flex-col items-center justify-center h-[50vh] select-none">
        <p>No team yet</p>
        <p className="text-base text-gray-400 mt-2">
          Create a new team or browse and join existing teams
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {myTeams?.map((teamInfo) => (
          <TeamCard
            key={teamInfo?.team?.id}
            team={teamInfo?.team}
            role={teamInfo?.role}
            onClick={() => gotoMyTeam(teamInfo?.team?.id)}
            showRequestButton={false}
          />
        ))}
      </div>
    )}
  </div>
  );
}
