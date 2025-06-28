import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Users, Shield, Trash2, UserPlus } from "lucide-react";

export function LeaderActions({ isLeader, userRole }) {
  if (userRole === "member") return null;

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
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Notice
          </Button>
          {isLeader && (
            <>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Manage Team
              </Button>
              <Button variant="outline" size="sm">
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
    </Card>
  );
}
