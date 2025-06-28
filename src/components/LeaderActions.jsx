import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Trash2, UserPlus } from "lucide-react";
import { Badge } from "./ui/badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTeamRequests, respondRequest } from "@/http/api";
import { JoinRequestsModal } from "./JoinReqestModel";
import { useState } from "react";
import { toast } from "sonner";

export function LeaderActions({
  isLeader,
  userRole,
  teamId,
}) {
  if (userRole !== "LEADER") return null;

  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: joinRequests = [], refetch: refetchRequests } = useQuery({
    queryKey: ["joinRequests", teamId],
    queryFn: async () => {
      const res = await getTeamRequests(teamId);
      return res.data.data;
    },
    enabled: !!teamId && isLeader,
  });

  const { mutate: respondMutation, isLoading: respondLoading } = useMutation({
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

  const handleRequest = (requestId, accept) => {
    console.log(requestId, accept);
    respondMutation({ requestId, accept });
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
                onClick={() => setShowModal(true)}
              >
                {(joinRequests && joinRequests.length !== 0) &&
                  <Badge className={"absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-4 h-4"} >
                    {joinRequests.length}
                  </Badge>
                }
                <UserPlus className="h-4 w-4 mr-2" />
                See Requests
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Disband Team
              </Button>
            </>
          )}
        </div>
      </CardContent>

      <JoinRequestsModal
        open={showModal}
        onClose={() => setShowModal(false)}
        requests={joinRequests}
        handleRequest={handleRequest}
      />

    </Card>
  );
}
