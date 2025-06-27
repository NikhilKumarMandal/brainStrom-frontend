import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";

export function ActivityLog({ logs, canEdit }) {
  const displayLogs = canEdit ? logs : logs.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          {canEdit ? "Team Activity Log" : "Recent Updates"}
        </CardTitle>
        <CardDescription>
          {canEdit
            ? "Recent team activities and changes"
            : "Latest team announcements"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {displayLogs.map((log, index) => (
              <div key={log.id}>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {log.action}
                      </span>
                      <span className="text-xs text-gray-500">
                        {log.timestamp}
                      </span>
                    </div>
                    {canEdit && (
                      <p className="text-sm text-gray-600 mb-1">
                        by {log.user}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">{log.details}</p>
                  </div>
                </div>
                {index < displayLogs.length - 1 && (
                  <Separator className="my-3 ml-5" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
