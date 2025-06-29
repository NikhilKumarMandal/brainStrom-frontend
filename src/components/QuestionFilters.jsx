import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

export const QuestionFilters = ({
  courses,
  selectedCourse,
  onCourseChange,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 flex flex-col lg:flex-row lg:items-center gap-6">
      <div className="flex items-center gap-2 text-gray-700">
        <Filter className="w-5 h-5 text-gray-600" />
        <span className="font-medium">Filters</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-1/2">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Course
          </label>
          <Select
            value={selectedCourse || "all-courses"}
            onValueChange={(value) =>
              onCourseChange(value === "all-courses" ? "" : value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-courses">All Courses</SelectItem>
              {courses.map((course, idx) => (
                <SelectItem key={idx} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
