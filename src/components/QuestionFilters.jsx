
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, Pin } from 'lucide-react';



export const QuestionFilters = ({
  courses,
  selectedCourse,
  pinFilter,
  onFilter,
}) => {
  const handleCourseChange = (value) => {
    const courseValue = value === 'all-courses' ? '' : value;
    onFilter(courseValue, pinFilter);
  };

  const handlePinFilterChange = (newPinFilter) => {
    onFilter(selectedCourse, newPinFilter);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">Filters:</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Course
            </label>
            <Select value={selectedCourse || 'all-courses'} onValueChange={handleCourseChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-courses">All Courses</SelectItem>
                {courses.map((course, index) => (
                  <SelectItem key={index} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Pin Status
            </label>
            <div className="flex gap-2">
              <Button
                variant={pinFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePinFilterChange('all')}
                className="flex-1"
              >
                All
              </Button>
              <Button
                variant={pinFilter === 'pinned' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePinFilterChange('pinned')}
                className="flex-1 gap-1"
              >
                <Pin className="w-4 h-4" />
                Pinned
              </Button>
              <Button
                variant={pinFilter === 'unpinned' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePinFilterChange('unpinned')}
                className="flex-1"
              >
                Unpinned
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};