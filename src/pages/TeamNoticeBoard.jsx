import { useState } from "react";
import { NoticeHeader } from "../components/NoticeHeader";
import { NoticeBoard } from "../components/NoticeBoard";
import { LeaderActions } from "../components/LeaderActions";
import { TeamMembers } from "../components/TeamMembers";
import { ActivityLog } from "../components/ActivityLog";
import { MemberProfile } from "../components/MemberProfile";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTeamById } from "@/http/api";
import { useAuthStore } from "@/store/store";


async function getTeamDetails(teamId) {
  const { data } = await getTeamById(teamId);
  console.log(data.data);
  return data.data;
}

// async function getNoticeboard(teamId) {
//   const { data } = await getNotice(teamId);
//   console.log(data.data);
//   return data.data?.[0] || null;
// }

async function getTeamLogs(teamId) {
  const { data } = await getTeamHistory(teamId);
  // console.log(data.data);
  return data.data;
}

export default function TeamNoticeBoard() {

  // const [currentUser, setCurrentUser] = useState({
  //   id: "1",
  //   name: "Sarah Johnson",
  //   role: "leader",
  //   avatar: "/placeholder.svg?height=40&width=40",
  // });

  // const [currentNotice, setCurrentNotice] = useState({
  //   title: "Weekly Team Meeting",
  //   content:
  //     "Don't forget about our weekly team meeting tomorrow at 2 PM. We'll be discussing the Q4 roadmap and project updates.",
  //   author: "Sarah Johnson",
  //   timestamp: "2 hours ago",
  // });

  // const [teamMembers, setTeamMembers] = useState([
  //   {
  //     id: "1",
  //     name: "Sarah Johnson",
  //     role: "Team Lead",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     email: "sarah.johnson@company.com",
  //     joinDate: "Jan 2023",
  //   },
  //   {
  //     id: "2",
  //     name: "Mike Chen",
  //     role: "Co-Leader",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     email: "mike.chen@company.com",
  //     joinDate: "Feb 2023",
  //   },
  //   {
  //     id: "3",
  //     name: "Emily Davis",
  //     role: "Designer",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     email: "emily.davis@company.com",
  //     joinDate: "Mar 2023",
  //   },
  //   {
  //     id: "4",
  //     name: "Alex Rodriguez",
  //     role: "Developer",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     email: "alex.rodriguez@company.com",
  //     joinDate: "Apr 2023",
  //   },
  //   {
  //     id: "5",
  //     name: "Lisa Wang",
  //     role: "QA Engineer",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     email: "lisa.wang@company.com",
  //     joinDate: "May 2023",
  //   },
  // ]);

  // const auditLogs = [
  //   {
  //     id: "1",
  //     action: "Notice Updated",
  //     user: "Sarah Johnson",
  //     timestamp: "2 hours ago",
  //     details: "Updated weekly meeting notice",
  //   },
  //   {
  //     id: "2",
  //     action: "Member Added",
  //     user: "Sarah Johnson",
  //     timestamp: "1 day ago",
  //     details: "Added Lisa Wang to the team",
  //   },
  //   {
  //     id: "3",
  //     action: "Project Created",
  //     user: "Mike Chen",
  //     timestamp: "2 days ago",
  //     details: "Created new project: Mobile App Redesign",
  //   },
  //   {
  //     id: "4",
  //     action: "Role Changed",
  //     user: "Sarah Johnson",
  //     timestamp: "3 days ago",
  //     details: "Updated Alex Rodriguez role to Senior Developer",
  //   },
  //   {
  //     id: "5",
  //     action: "Notice Posted",
  //     user: "Emily Davis",
  //     timestamp: "1 week ago",
  //     details: "Posted design review guidelines",
  //   },
  // ];

  const [selectedMember, setSelectedMember] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useAuthStore();

  const { teamId } = useParams()
  console.log(teamId);

  const { data: team, isLoading: teamLoading } = useQuery({
    queryKey: [teamId],
    queryFn: () => getTeamDetails(teamId),
  });

  console.log(team);

  // const handleRoleChange = (role) => {
  //   setCurrentUser({ ...currentUser, role });
  // };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsProfileOpen(true);
  };

  const handleKickMember = () => {
    if (selectedMember) {
      setTeamMembers(
        teamMembers.filter((member) => member.id !== selectedMember.id)
      );
      setIsProfileOpen(false);
      setSelectedMember(null);
    }
  };

  const handlePromoteMember = (newRole) => {
    if (selectedMember) {
      setTeamMembers(
        teamMembers.map((member) =>
          member.id === selectedMember.id
            ? { ...member, role: newRole }
            : member
        )
      );
      setSelectedMember({ ...selectedMember, role: newRole });
    }
  };



  if (teamLoading) return (
    <div className="flex flex-col items-center justify-center gap-2 text-xl text-black m-auto h-screen">
      <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
      Loading...
    </div>
  );

  // const hasPermission = user.role === "LEADER" || currentUser.role === "CO_LEADER";
  const currentUser = team.members.find((member) => member.user.id === user.id);
  // const currentUser = user
  const isLeader = user.id === team?.leaderId;
  const isCoLeader = user.id === team?.coLeaderId;


  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <NoticeHeader currentUser={currentUser} teamName={team?.name} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <NoticeBoard
            teamId={teamId}
            hasPermission={isLeader || isCoLeader}
            members={team.members}
          />
          <LeaderActions isLeader={isLeader} userRole={currentUser.role} />
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
        onKick={handleKickMember}
        onPromote={handlePromoteMember}
        teamId={teamId}
      />
    </div>
  );
}
