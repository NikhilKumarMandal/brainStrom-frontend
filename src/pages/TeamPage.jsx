import { useState } from "react";
import { NoticeBoard } from "../components/NoticeBoard";
import { LeaderActions } from "../components/LeaderActions";
import { TeamMembers } from "../components/TeamMembers";
import { ActivityLog } from "../components/ActivityLog";
import { MemberProfile } from "../components/MemberProfile";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTeamById } from "@/http/api";
import { useAuthStore } from "@/store/store";
import useNavigation from "@/utils/navigation";
import TeamHeader from "@/components/TeamHeader";

async function getTeamDetails(teamId) {
  const { data } = await getTeamById(teamId);
  return data.data;
}

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useAuthStore();
  const { teamId } = useParams();
  const { gotoHomePage } = useNavigation();

  const { data: team, isLoading: teamLoading } = useQuery({
    queryKey: [teamId],
    queryFn: () => getTeamDetails(teamId),
  });

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsProfileOpen(true);
  };

  if (teamLoading) return (
    <div className="flex flex-col items-center justify-center gap-2 text-xl text-black m-auto h-screen">
      <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const isMember = team?.members?.some((member) => member.userId === user.id);
  if (!isMember) gotoHomePage();

  const currentUser = team.members.find((member) => member.user.id === user.id);
  const isLeader = user.id === team?.leaderId;
  const coLeader =
    team.members.find((member) => member.role === "CO_LEADER") || null;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <TeamHeader
        currentUser={currentUser}
        teamName={team?.name}
        teamId={teamId}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <NoticeBoard
            teamId={teamId}
            hasPermission={isLeader || coLeader?.user.id === user.id}
            members={team.members}
          />
          <LeaderActions
            isLeader={isLeader}
            userRole={currentUser.role}
            teamId={teamId}
          />
        </div>

        <div className="space-y-6">
          <TeamMembers
            members={team.members}
            isLeader={isLeader}
            currentUserId={currentUser.id}
            onMemberClick={handleMemberClick}
          />
          <ActivityLog teamId={teamId} />
        </div>
      </div>

      <MemberProfile
        member={selectedMember}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        teamId={teamId}
        coLeader={coLeader}
      />
    </div>
  );
}
