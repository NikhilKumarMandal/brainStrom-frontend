import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useNavigation from "@/utils/navigation";
import { timeAgo } from "@/utils/formateTime";

export function JoinRequestsModal({ open, onClose, requests = [], handleRequest }) {
  const { gotoUserProfile } = useNavigation();
  console.log(requests);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Team Join Requests</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {requests.length === 0 ? (
            <p className="text-sm text-gray-500">No pending requests.</p>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={req.user.avatar} alt={req.user.name} />
                    <AvatarFallback>
                      {req.user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium">
                    <span
                      onClick={() => gotoUserProfile(req.user.id)}
                      className="hover:underline cursor-pointer"
                    >
                      {req.user.name}
                    </span>
                    <span className="text-gray-400 ml-2 pointer-events-none select-none">
                      {timeAgo(req.requestedAt)}
                    </span>
                    <div className="text-gray-400">
                      requested to join your team
                    </div>
                  </div>
                </div>
                <h3 className="text-sm text-gray-400">{req.createdAt}</h3>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleRequest(req.id, "ACCEPTED")}>Accept</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleRequest(req.id, "REJECTED")}>Reject</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
