import React, { useRef, useEffect } from 'react'

export default function TeamMemberDetails({ member, isOpen, onClick, onSeeProfile, onKick, closeDropdown }) {
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown()
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div
      className="relative group flex items-center gap-2 flex-col cursor-pointer hover:scale-110 transition"
      onClick={onClick}
    >
      <img src={member.avatar} alt="" className="w-12 h-12 rounded-full bg-gray-700" />
      <h2 className="text-sm font-semibold text-gray-300 group-hover:text-amber-400">{member.name}</h2>

      {isOpen && (
        <div ref={dropdownRef} className="absolute bottom-full mb-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-32 z-10">
          <button onClick={(e) => { e.stopPropagation(); onSeeProfile(member) }}
            className="block w-full text-left px-4 py-2 text-sm border-none hover:bg-gray-700 focus:outline-none">See Profile</button>
          <div className="border-t border-gray-700"></div>
          <button onClick={(e) => { e.stopPropagation(); onKick(member) }}
            className="block w-full text-left px-4 py-2 text-sm text-red-400 border-none hover:bg-red-600 hover:text-gray-200 focus:outline-none">Kick</button>
        </div>
      )}
    </div>
  )
}
