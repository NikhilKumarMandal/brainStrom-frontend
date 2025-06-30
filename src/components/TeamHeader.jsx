import { Badge } from "@/components/ui/badge";
import { formateString } from "@/utils/formateString";
import { Crown, Star, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { ReasonModal } from "./ReasonModel";
import { toast } from "sonner";
import useNavigation from "@/utils/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { leaveTeam } from "@/http/api";

export default function TeamHeader({ currentUser, teamName, teamId }) {

  const [reason, setReason] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { gotoHomePage } = useNavigation();

  const leaveMutation = useMutation({
    mutationFn: ({ teamId, reason }) => leaveTeam(teamId, reason),
    onSuccess: () => {
      gotoHomePage();
      toast.success("Left team successfully");
    },
    onError: () => toast.error("Failed to leave team"),
  });

  const getRoleIcon = (role) => {
    switch (role) {
      case "LEADER":
        return <Crown className="h-4 w-4 text-yellow-600 self-center" />;
      case "CO_LEADER":
        return <Star className="h-4 w-4 text-blue-600 self-center" />;
      default:
        return <Eye className="h-4 w-4 text-gray-500 self-center" />;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "LEADER":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "CO_LEADER":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">{teamName}</h1>
        <div className="flex self-end gap-2 mb-1">
          {getRoleIcon(currentUser.role)}
          <Badge className={`${getRoleBadgeColor(currentUser.role)} capitalize`}>
            {formateString(currentUser.role)}
          </Badge>
        </div>
      </div>

      {currentUser.role !== "LEADER" &&
        <Button
          variant="destructive"
          onClick={() => setIsOpen(true)}
        >
          Leave Team
        </Button>
      }

      <ReasonModal
        title={"Leave Team"}
        description={"Reason for leaving the team"}
        open={isOpen}
        onOpenChange={(val) => setIsOpen(val)}
        onConfirm={(leaveReason) => leaveMutation.mutate({ teamId, reason: leaveReason })}
        reason={reason}
        setReason={setReason}
        isPending={leaveMutation.isPending}
      />
    </div>
  );
}
