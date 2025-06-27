import { Badge } from "@/components/ui/badge";
import { formateString } from "@/utils/formateString";
import { Crown, Star, Eye } from "lucide-react";

export function NoticeHeader({ currentUser, teamName }) {
  const getRoleIcon = (role) => {
    switch (role) {
      case "LEADER":
        return <Crown className="h-4 w-4 text-yellow-600" />;
      case "CO-LEADER":
        return <Star className="h-4 w-4 text-blue-600" />;
      default:
        return <Eye className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "LEADER":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "CO-LEADER":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex items-center gap-6">
      <h1 className="text-3xl font-bold text-gray-900">
        {teamName}
      </h1>
      <div className="flex self-end gap-2">
        {getRoleIcon(currentUser.role)}
        <Badge
          className={`${getRoleBadgeColor(currentUser.role)} capitalize`}
        >
          {formateString(currentUser.role)}
        </Badge>
      </div>
    </div>

    //   {/* <div className="flex items-center gap-4">
    //     <div>
    //       <h1 className="text-3xl font-bold text-gray-900">
    //         {teamName}
    //       </h1>
    //       <p className="text-gray-600">
    //         Stay updated with team announcements and activities
    //       </p>
    //     </div>

    //     <div className="flex items-center gap-2">
    //       {getRoleIcon(currentUser.role)}
    //       <Badge
    //         className={`${getRoleBadgeColor(currentUser.role)} capitalize`}
    //       >
    //         {currentUser.role}
    //       </Badge>
    //     </div>
    //   </div> */}
    // // </div>
  );
}
