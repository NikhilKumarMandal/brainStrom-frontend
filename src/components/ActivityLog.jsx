import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getTeamHistory } from "@/http/api";
import { formateString } from "@/utils/formateString";
import { timeAgo } from "@/utils/formateTime";
import { useQuery } from "@tanstack/react-query";
import { Clock } from "lucide-react";

async function getTeamteamLogs(teamId) {
  const { data } = await getTeamHistory(teamId);
  return data.data;
}

export function ActivityLog({ teamId }) {
  const { data: logs, isLoading: teamLogsLoading } = useQuery({
    queryKey: [teamId, "teamLogs"],
    queryFn: () => getTeamteamLogs(teamId),
  });

  if (teamLogsLoading) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Team Activity Log
        </CardTitle>
        <CardDescription>Recent team activities and changes</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {logs.map((log, index) => (
              <div key={index}>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {formateString(log.action)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {timeAgo(log.timestamp)}
                      </span>
                    </div>
                    {/* {canEdit && ( */}
                    <p className="text-sm text-gray-600 mb-1">by {log.actor}</p>
                    {/* )} */}
                    <p className="text-xs text-gray-500">{log.message}</p>
                  </div>
                </div>
                {index < logs.length - 1 && <Separator className="my-3 ml-5" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
