import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen } from "lucide-react";
import { useAuthStore } from "@/store/store";
import { ReasonModal } from "./ReasonModel";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { requestJoinTeam } from "@/http/api";
import { useEffect, useState } from "react";

export default function TeamCard({
  team,
  onClick,
  showRequestButton = true,
  canJoin = true,
}) {
  const { user } = useAuthStore();
  const teamId = team?.id;
  const [showDialog, setShowDialog] = useState(false);
  const [description, setDescription] = useState("");
  const [isRequested, setIsRequested] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ teamId, description }) => {
      const { data } = await requestJoinTeam(teamId, description);
      return data;
    },
    onSuccess: () => {
      toast.success("Submitted");
    },
    onError: () => {
      toast.error("Failed to submit");
    },
  });

  const handleSendRequest = () => {
    if (description.trim() === "") {
      toast.error("Please enter a reason");
      return;
    }
    mutate({ teamId, description });
    setShowDialog(false);
    setDescription("");
  };

  useEffect(() => {
    if (!user?.joinRequestLockAt) return;
    const now = Date.now();
    const diff = now - new Date(user.joinRequestLockAt).getTime();
    if (diff < 10 * 60 * 1000) setIsRequested(true);
  }, [user]);

  return (
    <Card
      onClick={onClick}
      className="h-full flex flex-col hover:shadow-lg transition-all duration-200 border-gray-200 bg-white cursor-pointer"
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
            {team?.name}
          </CardTitle>
          <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
            <Users className="h-3 w-3" />
            <span>{team?._count?.members}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="h-4 w-4 text-blue-600" />
          <Badge
            variant="secondary"
            className="text-xs bg-blue-50 text-blue-700 border-blue-200"
          >
            {team?.course?.name}
          </Badge>
        </div>

        <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {team?.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
            Skills
          </h4>
          <div className="flex flex-wrap gap-1">
            {team?.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs border-gray-200 text-gray-600"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      {showRequestButton && (
        <CardFooter className="pt-4">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setShowDialog(true);
            }}
            disabled={isRequested || !canJoin}
            className="w-full bg-primary text-white font-medium transition-colors"
          >
            {canJoin
              ? isRequested
                ? "Already Requested"
                : "Request to join"
              : "Max Teams Reached"}
          </Button>
        </CardFooter>
      )}

      <ReasonModal
        title={"Request to join team"}
        description={"Please provide a reason for joining the team."}
        open={showDialog}
        onOpenChange={(val) => setShowDialog(val)}
        onConfirm={handleSendRequest}
        reason={description}
        setReason={setDescription}
        isPending={isPending}
      />
    </Card>
  );
};
