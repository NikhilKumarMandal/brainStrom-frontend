import React from 'react'

export default function InfoCard({ title, number, action }) {
  return (
    <div
      onClick={action}
      className="flex flex-col justify-evenly items-center h-[25vh] bg-gray-800 rounded-3xl shadow-xl cursor-pointer hover:bg-gray-700 transition duration-300"
    >
      <h2 className="text-2xl font-bold text-amber-400">{title}</h2>
      <h1 className="text-4xl font-semibold text-amber-200">{number}</h1>
    </div>
  )
}
