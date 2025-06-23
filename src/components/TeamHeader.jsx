import React from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'

export default function TeamHeader({ name, isLeader, onEditClick, onNotifyClick }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-end gap-4">
        <h1 className="text-3xl font-bold">{name}</h1>
        {isLeader && <IoIosNotificationsOutline
          onClick={onNotifyClick}
          className="text-3xl cursor-pointer hover:text-amber-400 hover:scale-110 transition"
        />}
      </span>

      {isLeader && (
        <button
          onClick={onEditClick}
          className="px-4 py-2 rounded-full border text-sm transition border-amber-700 text-white hover:bg-amber-700 hover:border-amber-500 focus:outline-none"
        >
          Edit Noticeboard
        </button>
      )}
    </div>
  )
}
