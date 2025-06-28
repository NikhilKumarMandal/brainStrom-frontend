import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Trash2, UserPlus } from "lucide-react";
import { Badge } from "./ui/badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { disbandTeam, getTeamRequests, respondRequest } from "@/http/api";
import { JoinRequestsModal } from "./JoinReqestModel";
import { useState } from "react";
import { toast } from "sonner";
import { ReasonModal } from "./ReasonModel";

export function LeaderActions({
  isLeader,
  userRole,
  teamId,
}) {
  if (userRole !== "LEADER") return null;

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [disbandReason, setDisbandReason] = useState("");
  const [showDisbandModal, setShowDisbandModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: joinRequests = [], refetch: refetchRequests } = useQuery({
    queryKey: ["joinRequests", teamId],
    queryFn: async () => {
      const res = await getTeamRequests(teamId);
      return res.data.data;
    },
    enabled: !!teamId && isLeader,
  });

  const { mutate: respondMutation } = useMutation({
    mutationFn: ({ requestId, accept }) => respondRequest(requestId, accept),
    onSuccess: (_data, variables) => {
      refetchRequests();
      if (variables.accept) {
        queryClient.invalidateQueries([teamId]);
      }
      toast.success("Request responded successfully");
    },
    onError: () => toast.error("Failed to respond to request"),
  });

  const { mutate: disbandMutation, isLoading: disbandLoading } = useMutation({
    mutationFn: ({ teamId, reason }) => disbandTeam(teamId, reason),
    onSuccess: () => {
      toast.success("Team disbanded successfully");
      window.location.href = "/";
    },
    onError: () => toast.error("Failed to disband team"),
  });

  const handleRequest = (requestId, accept) => {
    respondMutation({ requestId, accept });
  };

  const handleDisband = () => {
    disbandMutation({ teamId, reason: disbandReason });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-orange-600" />
          {isLeader ? "Leader Actions" : "Co-Leader Actions"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {isLeader && (
            <>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Manage Team
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={"relative"}
                onClick={() => setShowRequestModal(true)}
              >
                {(joinRequests && joinRequests.length !== 0) &&
                  <Badge className={"absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-4 h-4"} >
                    {joinRequests.length}
                  </Badge>
                }
                <UserPlus className="h-4 w-4 mr-2" />
                See Requests
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowDisbandModal(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Disband Team
              </Button>
            </>
          )}
        </div>
      </CardContent>

      <JoinRequestsModal
        open={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        requests={joinRequests}
        handleRequest={handleRequest}
      />

      <ReasonModal
        title="Disband Team"
        description="Are you sure you want to disband this team?"
        open={showDisbandModal}
        onOpenChange={(val) => setShowDisbandModal(val)}
        onConfirm={handleDisband}
        reason={disbandReason}
        setReason={setDisbandReason}
        isPending={disbandLoading}
      />

    </Card>
  );
}
