import { useEffect, useState } from "react";
import { Search, Filter, ChevronRight, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TeamCard from "../components/TeamCard";
import { useAuthStore } from "@/store/store";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAllTeam, getMyTeams } from "@/http/api";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";
import { Button } from "@/components/ui/button";

const LIMIT = 5;

function BrowseTeams() {
  const { user } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isRequested, setIsRequested] = useState(false);

  useEffect(() => {
    if (!user?.joinRequestLockAt) return;
    const now = Date.now();
    const diff = now - new Date(user.joinRequestLockAt).getTime();
    if (diff < 10 * 60 * 1000) setIsRequested(true);
  }, [user]);

  const [queryParams, setQueryParams] = useState({
    limit: LIMIT,
    page: 1,
  });

  const { data: myTeams, isLoading: isMyTeamsLoading } = useQuery({
    queryKey: ["my-teams"],
    queryFn: async () => {
      const res = await getMyTeams();
      return res.data.data;
    },
  });

  const enrolledCourseCount = user?.enrolledCourses?.length || 0;
  const canJoinMoreTeams = myTeams?.length < enrolledCourseCount;
  const courses1 = user?.enrolledCourses?.map((c) => c?.course.name);
  const course = searchParams.get("course") || "";
  const q = searchParams.get("q") || "";

  const { data: allTeamData, isLoading: isTeamsLoading } = useQuery({
    queryKey: ["team", queryParams, q, course],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1])
      );

      const queryString = new URLSearchParams(filteredParams).toString();
      const filters = {
        queryParams: queryString,
        q,
        course,
      };

      return getAllTeam(filters).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  if (isTeamsLoading || isMyTeamsLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-xl text-black m-auto h-screen">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const teams = allTeamData?.data?.teams?.filter(
    (team) => team.leaderId !== user.id
  );
  const totalPages = allTeamData?.data?.totalPages || 1;

  return (
    <>
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">
              Browse Teams
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover amazing teams and find your perfect collaboration match
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search teams, skills, or keywords..."
                onChange={debounce((e) => {
                  setSearchParams((prev) => {
                    prev.set("q", e.target.value);
                    return prev;
                  });
                  setQueryParams((prev) => ({ ...prev, page: 1 }));
                }, 1000)}
                className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Course Select */}
            <div className="flex items-center gap-2 sm:w-auto w-full">
              <Filter className="text-gray-400 h-4 w-4" />
              <Select
                onValueChange={(value) => {
                  setSearchParams((prev) => {
                    if (value === "all") {
                      prev.delete("course");
                    } else {
                      prev.set("course", value);
                    }
                    return prev;
                  });
                  setQueryParams((prev) => ({ ...prev, page: 1 }));
                }}
              >
                <SelectTrigger className="w-full sm:w-[180px] h-11 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses1?.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {teams?.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No teams found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600 text-sm">
                {teams?.length} team{teams?.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams?.map((team) => (
                <TeamCard
                  key={team?.id}
                  team={team}
                  canJoin={canJoinMoreTeams}
                  userCourses={user?.enrolledCourses}
                  isRequested={isRequested}
                  setIsRequested={setIsRequested}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 pt-6">
        <Button
          size="icon"
          variant="outline"
          disabled={queryParams.page === 1}
          onClick={() =>
            setQueryParams((prev) => ({ ...prev, page: prev.page - 1 }))
          }
          className="bg-[#1f1f1f] border border-gray-600 text-gray-300 hover:bg-[#333] hover:text-white rounded-full p-3 transition-all duration-200"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <span className="px-4 py-2 rounded-full bg-primary text-white font-medium shadow-md text-sm">
          Page {queryParams.page} of {totalPages}
        </span>

        <Button
          size="icon"
          variant="outline"
          disabled={queryParams.page === totalPages}
          onClick={() =>
            setQueryParams((prev) => ({ ...prev, page: prev.page + 1 }))
          }
          className="bg-[#1f1f1f] border border-gray-600 text-gray-300 hover:bg-[#333] hover:text-white rounded-full p-3 transition-all duration-200"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}

export default BrowseTeams;
