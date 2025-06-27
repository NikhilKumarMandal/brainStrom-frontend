import { useState } from "react";
import { NoticeHeader } from "../components/NoticeHeader";
import { NoticeBoard } from "../components/NoticeBoard";
import { LeaderActions } from "../components/LeaderActions";
import { TeamMembers } from "../components/TeamMembers";
import { ActivityLog } from "../components/ActivityLog";
import { MemberProfile } from "../components/MemberProfile";

export default function TeamNoticeBoard() {
  const [currentUser, setCurrentUser] = useState({
    id: "1",
    name: "Sarah Johnson",
    role: "leader",
    avatar: "/placeholder.svg?height=40&width=40",
  });

  const [currentNotice, setCurrentNotice] = useState({
    title: "Weekly Team Meeting",
    content:
      "Don't forget about our weekly team meeting tomorrow at 2 PM. We'll be discussing the Q4 roadmap and project updates.",
    author: "Sarah Johnson",
    timestamp: "2 hours ago",
  });

  const [selectedMember, setSelectedMember] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [teamMembers, setTeamMembers] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Team Lead",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "sarah.johnson@company.com",
      joinDate: "Jan 2023",
    },
    {
      id: "2",
      name: "Mike Chen",
      role: "Co-Leader",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "mike.chen@company.com",
      joinDate: "Feb 2023",
    },
    {
      id: "3",
      name: "Emily Davis",
      role: "Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "emily.davis@company.com",
      joinDate: "Mar 2023",
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      role: "Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "alex.rodriguez@company.com",
      joinDate: "Apr 2023",
    },
    {
      id: "5",
      name: "Lisa Wang",
      role: "QA Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "lisa.wang@company.com",
      joinDate: "May 2023",
    },
  ]);

  const auditLogs = [
    {
      id: "1",
      action: "Notice Updated",
      user: "Sarah Johnson",
      timestamp: "2 hours ago",
      details: "Updated weekly meeting notice",
    },
    {
      id: "2",
      action: "Member Added",
      user: "Sarah Johnson",
      timestamp: "1 day ago",
      details: "Added Lisa Wang to the team",
    },
    {
      id: "3",
      action: "Project Created",
      user: "Mike Chen",
      timestamp: "2 days ago",
      details: "Created new project: Mobile App Redesign",
    },
    {
      id: "4",
      action: "Role Changed",
      user: "Sarah Johnson",
      timestamp: "3 days ago",
      details: "Updated Alex Rodriguez role to Senior Developer",
    },
    {
      id: "5",
      action: "Notice Posted",
      user: "Emily Davis",
      timestamp: "1 week ago",
      details: "Posted design review guidelines",
    },
  ];

  const handleRoleChange = (role) => {
    setCurrentUser({ ...currentUser, role });
  };

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

  const canEdit =
    currentUser.role === "leader" || currentUser.role === "co-leader";
  const isLeader = currentUser.role === "leader";

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <NoticeHeader currentUser={currentUser} onRoleChange={handleRoleChange} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <NoticeBoard
            notice={currentNotice}
            onUpdateNotice={setCurrentNotice}
            canEdit={canEdit}
            isLeader={isLeader}
          />
          <LeaderActions isLeader={isLeader} userRole={currentUser.role} />
        </div>

        <div className="space-y-6">
          <TeamMembers
            members={teamMembers}
            isLeader={isLeader}
            currentUserId={currentUser.id}
            onMemberClick={handleMemberClick}
          />
          <ActivityLog logs={auditLogs} canEdit={canEdit} />
        </div>
      </div>

      <MemberProfile
        member={selectedMember}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onKick={handleKickMember}
        onPromote={handlePromoteMember}
      />
    </div>
  );
}
