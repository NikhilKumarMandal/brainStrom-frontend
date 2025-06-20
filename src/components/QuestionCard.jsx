import React from 'react'
import RichTextEditor from './RichTextEditor'

export default function QuestionCard({ title, description, courses }) {
  return (
    <div className="text-gray-200 rounded-xl px-6 w-full">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-100">{title}</h2>

      <p className="font-mono mb-2 text-gray-400">
        <strong>Description:</strong>
      </p>

      <RichTextEditor content={description} readOnly />

      <button
        onClick={(e) => {
          e.stopPropagation()
          alert('course')
        }}
        className="mt-4 inline-block text-sm border border-amber-600 text-gray-300 px-3 py-1 rounded-lg transition-transform hover:scale-105 hover:text-amber-400 hover:border-amber-400 focus:outline-none"
      >
        {courses}
      </button>
    </div>
  )
}
