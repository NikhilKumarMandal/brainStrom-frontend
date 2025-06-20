import React, { useState, useRef } from 'react'
import { mockCourses } from '../utils/mockData'

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
        Questions <span className="text-sm">▶</span>
      </h2>

      <button
        onClick={openMainMenu}
        className="px-4 py-1 text-sm border rounded-full text-amber-400 border-amber-400 hover:bg-amber-900 hover:border-none transition"
      >
        Sort By ▼
      </button>

      {/* Main Menu */}
      {showMainMenu && (
        <div
          className="absolute z-50 bg-gray-800 text-white rounded-md shadow-md min-w-[140px] overflow-hidden"
          style={{ top: mainMenuPos.y, left: mainMenuPos.x }}
        >
          <button
            ref={hardnessRef}
            onClick={() => openSubmenu('Hardness', hardnessRef)}
            className="w-full text-left px-4 py-2 hover:bg-gray-800 flex justify-between rounded-none"
          >
            Hardness <span>›</span>
          </button>
          <div className="border-t border-gray-700" />
          <button
            ref={coursesRef}
            onClick={() => openSubmenu('Courses', coursesRef)}
            className="w-full text-left px-4 py-2 hover:bg-gray-800 flex justify-between rounded-none"
          >
            Courses <span>›</span>
          </button>
        </div>
      )}

      {/* Submenu */}
      {showSubmenu && (
        <div
          className="absolute z-50 bg-gray-800 text-white rounded-md shadow-md min-w-[140px] overflow-hidden"
          style={{ top: submenuPos.y, left: submenuPos.x }}
        >
          {submenuType === 'Hardness' &&
            ['Easy', 'Medium', 'Hard'].map((level, i, arr) => (
              <React.Fragment key={level}>
                <button
                  onClick={() => handleSortOptionClick('Hardness', level)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded-none"
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
                    className="w-full text-left px-4 py-2 hover:bg-gray-800 rounded-none"
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
