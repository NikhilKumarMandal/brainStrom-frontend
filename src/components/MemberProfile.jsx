import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { changeRole, kickMember } from "@/http/api";
import { formateString } from "@/utils/formateString";
import { useAuthStore } from "@/store/store";
import { ReasonModal } from "./ReasonModel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Crown,
  Star,
  TrendingUp,
  TrendingDown,
  UserMinus,
  Mail,
  Calendar,
} from "lucide-react";

export function MemberProfile({ member, isOpen, onClose, teamId, coLeader }) {
  if (!member) return null;

  const { user } = useAuthStore();
  const userId = member.user.id;
  const [changeRoleOpen, setChangeRoleOpen] = useState(false);
  const [kickOpen, setKickOpen] = useState(false);
  const [changeRoleReason, setChangeRoleReason] = useState("");
  const [kickReason, setKickReason] = useState("");
  const queryClient = useQueryClient();

  const changeRoleMutation = useMutation({
    mutationFn: ({ teamId, userId, targetRole, reason }) =>
      changeRole(teamId, userId, targetRole, reason),
    onSuccess: () => {
      toast.success("Role changed successfully!");
      queryClient.invalidateQueries([teamId, "members"]);
      setChangeRoleReason("");
      onClose();
    },
    onError: (error) => {
      const message =
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        "Something went wrong";

      toast.error(message);
    },
  });

  const kickMutation = useMutation({
    mutationFn: ({ teamId, userId, reason }) =>
      kickMember(teamId, userId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries([teamId, "members"]);
      setKickReason("");
      toast.success("Member kicked successfully!");
      onClose();
    },
    onError: (error) => {
      const message =
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        "Something went wrong";

      toast.error(message);
    },
  });

  const targetRole = member.role === "CO_LEADER" ? "MEMBER" : "CO_LEADER";

  const handleReasonSubmit = (reason) => {
    changeRoleMutation.mutate({ teamId, userId, targetRole, reason });
  };

  const handleKickSubmit = (reason) => {
    kickMutation.mutate({ teamId, userId, reason });
  };

  const isAnotherCoLeaderPresent = coLeader && coLeader.user.id !== user.id;
  const isPromoting = member.role !== "CO_LEADER";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.user.avatar} alt={member.user.name} />
              <AvatarFallback>
                {member.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                {member.user.name}
                {member.role === "Team Lead" && (
                  <Crown className="h-4 w-4 text-yellow-600" />
                )}
                {member.role === "CO_LEADER" && (
                  <Star className="h-4 w-4 text-blue-600" />
                )}
              </div>
              <p className="text-sm text-gray-500 font-normal">
                {formateString(member.role)}
              </p>
            </div>
          </DialogTitle>
          <DialogDescription>
            Manage team member profile and permissions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{member.user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm">Joined {member.joinDate}</span>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-medium">Change Role</Label>
            <div className="flex flex-col gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setChangeRoleOpen(true)}
                disabled={isPromoting && isAnotherCoLeaderPresent}
              >
                {member.role === "CO_LEADER" ? (
                  <TrendingDown className="h-4 w-4 mr-2" />
                ) : (
                  <TrendingUp className="h-4 w-4 mr-2" />
                )}
                {member.role === "CO_LEADER"
                  ? "Demote to Member"
                  : "Promote to Co-Leader"}
              </Button>

              {isPromoting && isAnotherCoLeaderPresent && (
                <p className="text-xs text-red-500 pl-1">
                  A team can have only one Co-Leader. Remove the existing
                  Co-Leader to promote a new one.
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => setKickOpen(true)}>
            <UserMinus className="h-4 w-4 mr-2" />
            Remove from Team
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Promote/Demote Reason Modal */}
      <ReasonModal
        open={changeRoleOpen}
        onOpenChange={setChangeRoleOpen}
        title="Provide Reason"
        description={
          member.role === "CO_LEADER"
            ? "Please enter a reason for demotion."
            : "Please enter a reason for promotion."
        }
        onConfirm={handleReasonSubmit}
        reason={changeRoleReason}
        setReason={setChangeRoleReason}
        isPending={changeRoleMutation.isPending}
      />

      {/* Kick Reason Modal */}
      <ReasonModal
        open={kickOpen}
        onOpenChange={setKickOpen}
        title="Provide Reason"
        description="Please enter a reason for kick."
        onConfirm={handleKickSubmit}
        reason={kickReason}
        setReason={setKickReason}
        isPending={kickMutation.isPending}
      />
    </Dialog>
  );
}
