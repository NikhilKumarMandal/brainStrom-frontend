import { useState, useEffect, useRef } from 'react'
import { mockCourses } from '../utils/mockData'

export default function CourseSelector({ course, setCourse, showError }) {
  const [courses, setCourses] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      setCourses(mockCourses)
      if (mockCourses.length === 1) setCourse(mockCourses[0])
    }, 500)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (courses.length === 1) {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-400 mb-1">Course</label>
        <input
          type="text"
          value={courses[0]}
          disabled
          className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 cursor-not-allowed"
        />
      </div>
    )
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-400 mb-1">Choose Course *</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-gray-900 border ${showError && !course ? 'border-red-500' : 'border-gray-700'} text-gray-300 rounded-lg px-4 py-2 text-left focus:outline-none hover:border-amber-500`}
      >
        {course || 'Select course'}
      </button>

      {showError && !course && (
        <p className="text-sm text-red-500 mt-1">Course selection is required.</p>
      )}

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {courses.map((c, index) => (
            <div
              key={index}
              onClick={() => {
                setCourse(c)
                setIsOpen(false)
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-800 ${course === c
                ? 'bg-gray-800 text-amber-500 font-medium'
                : 'text-gray-300'
                }`}
            >
              {c}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
