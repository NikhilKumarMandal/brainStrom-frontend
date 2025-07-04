import { useState, useEffect } from "react";
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

const SkeletonBox = ({ className = "" }) => (
  <div className={`bg-gray-200 animate-pulse rounded-md ${className}`} />
);

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

  useEffect(() => {
    if (!teamLoading && team && user) {
      const isMember = team?.members?.some(
        (member) => member?.userId === user?.id
      );
      if (!isMember) gotoHomePage();
    }
  }, [team, teamLoading, user, gotoHomePage]);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsProfileOpen(true);
  };

  if (teamLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <SkeletonBox className="h-20 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <SkeletonBox className="h-48 w-full" />
            <SkeletonBox className="h-32 w-full" />
          </div>
          <div className="space-y-6">
            <SkeletonBox className="h-64 w-full" />
            <SkeletonBox className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const currentUser = team?.members?.find(
    (member) => member?.user?.id === user?.id
  );
  const isLeader = user?.id === team?.leaderId;
  const coLeader =
    team?.members?.find((member) => member?.role === "CO_LEADER") || null;

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
            hasPermission={isLeader || coLeader?.user?.id === user?.id}
            members={team?.members}
          />
          <LeaderActions
            isLeader={isLeader}
            userRole={currentUser?.role}
            teamId={teamId}
            totalMembers={team?.members?.length}
          />
        </div>

        <div className="space-y-6">
          <TeamMembers
            members={team?.members}
            isLeader={isLeader}
            currentUserId={currentUser?.id}
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
