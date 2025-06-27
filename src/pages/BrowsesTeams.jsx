import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Teamcards } from "../components/Teamcards";
import { useAuthStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { getAllTeam } from "@/http/api";

async function getTeams() {
  const { data } = await getAllTeam().then((res) => res.data);
  return data;
}

function BrowsesTeams() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const { user } = useAuthStore();
  const courses = user.enrolledCourses.map((c) => c.course.name);

  const { data: allTeamData, isLoading: isTeamsLoading } = useQuery({
    queryKey: ["team"],
    queryFn: getTeams,
  });
  console.log(allTeamData);
  

  if (isTeamsLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-xl text-black m-auto h-screen">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
        Loading...
      </div>
    );
  }

  const filteredTeams = allTeamData.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCourse =
      selectedCourse === "All Courses" || team.course === selectedCourse;

    return matchesSearch && matchesCourse;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">
              Browse Teams
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover amazing teams and find your perfect collaboration match
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search teams, skills, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 sm:w-auto w-full">
              <Filter className="text-gray-400 h-4 w-4" />
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full sm:w-[180px] h-11 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Courses">All Courses</SelectItem>
                  {courses.map((course) => (
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
        {filteredTeams.length === 0 ? (
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
                {filteredTeams.length} team
                {filteredTeams.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map((team) => (
                <Teamcards key={team.id} team={team} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BrowsesTeams;
