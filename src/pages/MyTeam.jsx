import React, { useState, useEffect, useRef } from 'react'
import RichTextEditor from '../components/RichTextEditor'
import { mockMyTeam } from '../utils/mockData'
import { Chip } from '../components/Chip'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { CgClose } from 'react-icons/cg'

export default function MyTeam() {
  const role = 'leader'
  const [openModal, setOpenModal] = useState(null) // 'notice' | 'edit' | 'members'
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null)
  const dropdownRef = useRef(null)

  const team = mockMyTeam

  function onNotificationClick() { alert('Notification clicked') }
  function toggleDropdown(index) { setDropdownOpenIndex(prev => (prev === index ? null : index)) }
  function handleSeeProfile(member) { alert(`Viewing profile of ${member.name}`) }
  function handleKick(member) { alert(`Kicked ${member.name}`) }

  // Detect click outside dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpenIndex(null)
      }
    }

    if (dropdownOpenIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpenIndex])

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-6 flex flex-col gap-6 overflow-y-auto">
      <div className="w-full min-h-[50%] bg-gray-800 p-6 rounded-lg shadow-2xl flex items-center justify-center">
        <h2 className="text-2xl font-bold absolute top-6">Noticeboard :</h2>
        <RichTextEditor content={team.notice} readOnly height="90%" />
      </div>

      <div className="flex items-center justify-between">
        <span className="flex items-end gap-4">
          <h1 className="text-3xl font-bold">{team.name}</h1>
          <IoIosNotificationsOutline
            onClick={onNotificationClick}
            className="text-3xl cursor-pointer hover:text-amber-400 hover:scale-110 transition"
          />
        </span>

        {role === 'leader' && (
          <button
            onClick={() => setOpenModal('edit')}
            className="px-4 py-2 rounded-full border text-sm transition border-amber-700 text-white hover:bg-amber-700 hover:border-amber-500 focus:outline-none"
          >
            Edit Noticeboard
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {team.skills.map((tag, i) => (
          <Chip key={i} tag={tag} />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h2
          onClick={() => setOpenModal('members')}
          className="w-fit text-lg font-semibold cursor-pointer hover:text-amber-400"
        >
          Members:
        </h2>

        <span className="flex flex-wrap gap-4">
          {team.members.map((m, i) => (
            <div
              key={i}
              className="relative group flex items-center gap-2 flex-col cursor-pointer hover:scale-110 transition"
              onClick={() => toggleDropdown(i)}
            >
              <img
                src={m.avatar}
                alt=""
                className="w-12 h-12 rounded-full bg-gray-700"
              />
              <h2 className="text-sm font-semibold text-gray-300 group-hover:text-amber-400">
                {m.name}
              </h2>

              {dropdownOpenIndex === i && (
                <div
                  ref={dropdownRef}
                  className="absolute bottom-full mb-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-32 z-10"
                >
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      handleSeeProfile(m)
                      setDropdownOpenIndex(null)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                  >
                    See Profile
                  </button>
                  <div className="border-t border-gray-700"></div>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      handleKick(m)
                      setDropdownOpenIndex(null)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-gray-200"
                  >
                    Kick
                  </button>
                </div>
              )}
            </div>
          ))}
        </span>
      </div>

      {/* Audit Logs */}
      <div className="mt-8 absolute right-6 bottom-6 w-1/3 h-[auto] min-h-[34%]">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 max-h-52 w-full h-full overflow-y-auto shadow-inner">
          <h2 className="text-lg font-semibold mb-2">Audit Logs:</h2>
          {team.auditLogs && team.auditLogs.length > 0 ? (
            <ul className="text-sm text-gray-400 space-y-2">
              {team.auditLogs.map((log, index) => (
                <li key={index} className="border-b border-gray-700 pb-1">
                  {log}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No audit logs yet.</p>
          )}
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 px-6 pt-4 pb-12 rounded-lg shadow-lg w-full max-w-md h-3/4 relative">
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-2 right-3 p-2 text-gray-400 border-none hover:text-white focus:outline-none"
            >
              <CgClose className="text-2xl" />
            </button>

            {openModal === 'edit' && (
              <>
                <h3 className="text-xl font-bold">Edit Notice</h3>
                <div className="mt-6 h-[85%]">
                  <RichTextEditor
                    content={team.notice}
                    onUpdate={({ editor }) => {
                      team.notice = editor.getHTML()
                    }}
                    height="100%"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setOpenModal(null)}
                    className="px-5 py-1 mt-3 rounded-full border-none bg-amber-700 hover:bg-amber-600 text-sm"
                  >
                    Save
                  </button>
                </div>
              </>
            )}

            {openModal === 'members' && (
              <>
                <h3 className="text-xl font-bold mb-4">Team Members</h3>
                <ul className="text-gray-300 space-y-3">
                  {team.members.map((m, i) => (
                    <li key={i} className="bg-gray-700 p-3 rounded-md">
                      <div className="font-semibold">
                        {m.name}{' '}
                        {m.isLeader && (
                          <span className="text-xs text-yellow-400">
                            Leader
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">
                        Skills: {m.skills.join(', ')}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
