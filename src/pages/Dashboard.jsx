import React from 'react'
import InfoCard from '../components/InfoCard'
// import InfoCard from "./InfoCard.jsx"

export default function SupAdminDashboard() {
  return (
    <div className="w-[75%] p-12 m-auto grid grid-cols-1 md:grid-cols-2 gap-12">
      <InfoCard title={"Total Users"} number={"1024"} />
      <InfoCard title={"Total Tags"} number={"63"} />
      <InfoCard title={"Total Questions"} number={"923"} />
      <InfoCard title={"Total Answers"} number={"2.3k"} />
    </div>
  )
}
