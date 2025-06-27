import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formateString } from "@/utils/formateString";
import { Users, Crown, Star } from "lucide-react";

export function TeamMembers({
  members,
  isLeader,
  currentUserId,
  onMemberClick,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-green-600" />
          Team Members
        </CardTitle>
        <CardDescription>
          {members.length} team member{members.length !== 1 ? "s" : ""}
          {isLeader && (
            <span className="ml-2 text-xs">(Click avatars to manage)</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <div className="space-y-3 p-1">
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar
                    className={`h-10 w-10 ${isLeader && member.id !== currentUserId
                      ? "cursor-pointer hover:ring-2 hover:ring-blue-500"
                      : ""
                      }`}
                    onClick={() =>
                      isLeader &&
                      member.id !== currentUserId &&
                      onMemberClick(member)
                    }
                  >
                    <AvatarImage
                      src={member.avatar || "/placeholder.svg"}
                      alt={member.name}
                    />
                    <AvatarFallback>
                      {member.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {member.user.name}
                    </p>
                    {member.role === "LEADER" && (
                      <Crown className="h-3 w-3 text-yellow-600" />
                    )}
                    {member.role === "CO_LEADER" && (
                      <Star className="h-3 w-3 text-blue-600" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{formateString(member.role)}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
