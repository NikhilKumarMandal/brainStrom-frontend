import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../store/store";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export default function CourseSelector({ course, setCourse, showError }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const { user } = useAuthStore();
  const courses = user.enrolledCourses.map((c) => c.course.name);

  console.log("user", user);
  console.log("courses", courses);

  useEffect(() => {
    setTimeout(() => {
      if (courses.length === 1) setCourse(courses[0]);
    }, 500);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (courses.length === 1) {
    return (
      <div className="w-full">
        <input
          type="text"
          value={courses[0]}
          disabled
          className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 cursor-not-allowed"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-cent border justify-between ${showError && !course ? "border-red-500" : "border-gray-700"} text-gray-300 rounded-lg px-4 py-2 text-left focus:outline-none hover:border-gray-500`}
      >
        {course || "Select course"}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {showError && !course && (
        <p className="text-sm text-red-500 mt-1">
          Course selection is required.
        </p>
      )}

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {courses.map((c, index) => (
            <div key={index}>
              <div
                onClick={() => {
                  setCourse(c);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-800 ${course === c ? "bg-gray-800 text-amber-500 font-medium" : "text-gray-300"}`}
              >
                {" "}
                {c}{" "}
              </div>

              {index < courses.length - 1 && (
                <div className="border-t border-gray-700 mx-2" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
