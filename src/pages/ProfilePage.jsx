import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserById, getUserHistory } from "@/http/api";
import { useAuthStore } from "@/store/store";
import { formateString } from "@/utils/formateString";
import { timeAgo } from "@/utils/formateTime";
import useNavigation from "@/utils/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  Diamond,
  Activity,
  Users,
  MessageSquareX,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";


const fetchUserById = async (id) => (await getUserById(id)).data.data;
const fetchUserLogs = async (id) => (await getUserHistory(id)).data.data;

export default function ProfilePage({ isMe = false }) {
  const { user: authUser } = useAuthStore();
  const { userId: paramId } = useParams();
  const userId = isMe ? authUser?.id : paramId;
  const { gotoEditProfile } = useNavigation();
  const [visibleLogsCount, setVisibleLogsCount] = useState(5);
  const queryClient = useQueryClient();
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => (isMe ? Promise.resolve(authUser) : fetchUserById(userId)),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
    enabled: !!userId,
  });

  const { data: userLogs, isLoading: logsLoading } = useQuery({
    queryKey: ["userLogs", userId],
    queryFn: () => fetchUserLogs(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
    enabled: !!userId,
  });

  const visibleLogs = userLogs?.slice(0, visibleLogsCount);
  const socialLinksMap = [
    { platform: "GitHub", field: "gitHubLink", icon: Github },
    { platform: "LinkedIn", field: "linkedinLink", icon: Linkedin },
    { platform: "X", field: "xLink", icon: Twitter },
    { platform: "Hashnode", field: "hashnodeLink", icon: Diamond },
    { platform: "Other", field: "otherLink", icon: Globe },
  ];

  const formattedSocialLinks = socialLinksMap
    .map(({ platform, field, icon }) => {
      const url = user?.[field];
      return url ? { platform, url, icon } : null;
    })
    .filter(Boolean);

  // if (userLoading || logsLoading)
  //   return (
  //     <div className="flex flex-col items-center justify-center gap-2 text-xl text-black m-auto h-screen">
  //       <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
  //     </div>
  //   );

  // console.log(user);

  return (
<div className="p-4">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* Header Card */}
        <Card className="overflow-hidden pt-0">
          <div className="h-32 bg-gradient-to-b from-gray-300 to-white"></div>
          <CardContent className="relative pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
              {userLoading ? (
                <Skeleton className="h-24 w-24 rounded-full -mt-12" />
              ) : (
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg -mt-12 mb-4 sm:mb-0">
                  <AvatarImage
                    src={user?.avatar || "/placeholder.svg"}
                    alt={user?.name}
                  />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {user?.name
                      ?.split(" ")
                      ?.map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}

              <div className="flex-1 space-y-2">
                {userLoading ? (
                  <Skeleton className="h-6 w-48" />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user?.name}
                  </h1>
                )}
                <div className="flex items-center space-x-4 text-gray-600 mt-2">
                  {userLoading ? (
                    <Skeleton className="h-4 w-40" />
                  ) : (
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{user?.email}</span>
                    </div>
                  )}
                </div>

                {!userLoading && (
                  <div className="flex space-x-2 pt-2">
                    {formattedSocialLinks?.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <Button
                          key={link?.platform}
                          variant="outline"
                          size="sm"
                          className="h-9 w-9 p-0 hover:bg-gray-100"
                          asChild
                        >
                          <Link
                            to={link?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <IconComponent className="h-4 w-4" />
                            <span className="sr-only">{link?.platform}</span>
                          </Link>
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>

              {isMe && !userLoading && (
                <Button onClick={gotoEditProfile} size="sm">
                  Edit Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Skills */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Skills</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-32" />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user?.skills?.length > 0 ? (
                    user?.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No skills added yet</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* History */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span>History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {logsLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-[90%]" />
                  <Skeleton className="h-6 w-[80%]" />
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {visibleLogs.map((item, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                            {selectIcon(item.action)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {formateString(item.action)}
                            </h3>
                            {item?.timestamp && (
                              <span className="text-sm text-gray-500 font-medium">
                                {timeAgo(item?.timestamp)}
                              </span>
                            )}
                          </div>
                          {item?.teamName && (
                            <p className="text-sm font-medium text-gray-600 mb-1">
                              Team: {item?.teamName}
                            </p>
                          )}
                          {item?.reason && (
                            <p className="text-sm text-gray-700">
                              Reason: {item?.reason}
                            </p>
                          )}
                        </div>
                      </div>
                      {index < visibleLogs?.length - 1 && (
                        <div className="absolute left-5 top-10 h-6 w-px bg-gray-200" />
                      )}
                    </div>
                  ))}
                  {userLogs?.length > visibleLogsCount && (
                    <div className="text-center pt-4">
                      <Button
                        onClick={() =>
                          setVisibleLogsCount((prev) => prev + 5)
                        }
                        variant="secondary"
                      >
                        See More
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function selectIcon(action) {
  switch (action) {
    case "TEAM_CREATED":
      return <Users className="h-4 w-4" />;
    case "DISBAND_TEAM":
      return <MessageSquareX className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
}
