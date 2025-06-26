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
import { toast } from "sonner";

export const Teamcards = ({ team }) => {
  const handleJoinRequest = () => {
    toast({
      title: "Join request sent!",
      description: `Your request to join "${team.name}" has been sent to the team leader.`,
    });
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-200 border-gray-200 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
            {team.name}
          </CardTitle>
          <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
            <Users className="h-3 w-3" />
            <span>{team._count.members}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="h-4 w-4 text-blue-600" />
          <Badge
            variant="secondary"
            className="text-xs bg-blue-50 text-blue-700 border-blue-200"
          >
            {team.course}
          </Badge>
        </div>

        <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {team.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
            Skills
          </h4>
          <div className="flex flex-wrap gap-1">
            {team.skills.map((skill, index) => (
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

      <CardFooter className="pt-4">
        <Button
          onClick={handleJoinRequest}
          className="w-full bg-primary text-white font-medium transition-colors"
        >
          Request to Join
        </Button>
      </CardFooter>
    </Card>
  );
};
