import React, { useState, useRef } from 'react'
import { mockCourses } from '../utils/mockData'
import { FaChevronRight, FaChevronDown, FaChevronUp } from 'react-icons/fa6'

export default function FilterOptions({ courses = mockCourses }) {
  const [showMainMenu, setShowMainMenu] = useState(false)
  const [showSubmenu, setShowSubmenu] = useState(false)
  const [submenuType, setSubmenuType] = useState('')
  const [mainMenuPos, setMainMenuPos] = useState({ x: 0, y: 0 })
  const [submenuPos, setSubmenuPos] = useState({ x: 0, y: 0 })

  const hardnessRef = useRef(null)
  const coursesRef = useRef(null)

  const openMainMenu = (e) => {
    const menuWidth = 160
    const buffer = 10
    const viewportWidth = window.innerWidth
    const triggerX = e.clientX
    const triggerY = e.clientY

    const openLeft = triggerX + menuWidth + buffer > viewportWidth
    const posX = openLeft ? triggerX - menuWidth : triggerX

    setShowMainMenu(true)
    setMainMenuPos({ x: posX, y: triggerY })
    setShowSubmenu(false)
  }

  const openSubmenu = (type, ref) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const submenuWidth = 160
    const padding = 10
    const openLeft = rect.right + submenuWidth > window.innerWidth
    const posX = openLeft ? rect.left - submenuWidth : rect.right + padding
    const posY = rect.top

    setSubmenuType(type)
    setShowSubmenu(true)
    setSubmenuPos({ x: posX, y: posY })
  }

  const closeMenus = () => {
    setShowMainMenu(false)
    setShowSubmenu(false)
    setSubmenuType('')
  }

  const handleSortOptionClick = (type, value) => {
    alert(`${type}: ${value}`)
    closeMenus()
  }

  return (
    <div className="w-[90%] flex justify-between items-center self-center">
      <h2 className="text-2xl font-bold text-gray-300 flex items-center gap-2">
        Questions <FaChevronRight className="text-lg" />
      </h2>

      <button
        onClick={openMainMenu}
        className="flex items-center gap-2 py-1 text-sm rounded-full text-amber-400 border-amber-400 hover:bg-amber-900 hover:border-amber-400 focus:outline-none transition"
      >
        Sort By {showMainMenu ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {/* Main Menu */}
      {showMainMenu && (
        <div
          className="absolute z-50 bg-gray-800 text-white rounded-lg shadow-md min-w-[100px] overflow-hidden border border-gray-700"
          style={{ top: mainMenuPos.y, left: mainMenuPos.x }}
        >
          <button
            ref={hardnessRef}
            onClick={() => openSubmenu('Hardness', hardnessRef)}
            className="w-full text-left px-4 py-2 hover:bg-gray-800 flex rounded-none items-center gap-2 border-none focus:outline-none"
          > Hardness <FaChevronRight className="text-sm" />
          </button>
          <div className="border-t border-gray-700" />
          <button
            ref={coursesRef}
            onClick={() => openSubmenu('Courses', coursesRef)}
            className="w-full text-left px-4 py-2 hover:bg-gray-800 flex rounded-none items-center gap-2 border-none focus:outline-none"
          > Courses <FaChevronRight className="text-sm" />
          </button>
        </div>
      )}

      {/* Submenu */}
      {showSubmenu && (
        <div
          className="absolute z-50 bg-gray-800 text-white rounded-md shadow-md min-w-[140px] overflow-hidden border border-gray-700"
          style={{ top: submenuPos.y, left: submenuPos.x }}
        >
          {submenuType === 'Hardness' &&
            ['Easy', 'Medium', 'Hard'].map((level, i, arr) => (
              <React.Fragment key={level}>
                <button
                  onClick={() => handleSortOptionClick('Hardness', level)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded-none border-none focus:outline-none"
                >
                  {level}
                </button>
                {i < arr.length - 1 && <div className="border-t border-gray-700" />}
              </React.Fragment>
            ))}

          {submenuType === 'Courses' && (
            <div className="max-h-64 overflow-y-auto">
              {courses.map((course, i) => (
                <React.Fragment key={course}>
                  <button
                    onClick={() => handleSortOptionClick('Course', course)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded-none border-none focus:outline-none"
                  >
                    {course}
                  </button>
                  {i < courses.length - 1 && <div className="border-t border-gray-700" />}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {(showMainMenu || showSubmenu) && (
        <div className="fixed inset-0 z-40" onClick={closeMenus} />
      )}
    </div>
  )
}
