import React from 'react'
import formatDate from '../utils/formatePostTime'

export default function QuestionMetaData({ author, answers, createdAt, isOpen, }) {
  return (
    <div className="flex items-center px-6 justify-between w-full">
      <div>
        <p className="text-sm text-gray-400">
          <strong>By:</strong> {author}
        </p>
        <p className="text-sm text-gray-400">
          {answers} answers · {formatDate(createdAt)}
        </p>
      </div>

      <span
        className={`px-3 py-1 border rounded-full text-sm font-semibold
          ${isOpen
            ? 'border-green-500 text-green-500'
            : 'border-red-500 text-red-500'
          }`}
      >
        {isOpen ? 'Open' : 'Closed'}
      </span>
    </div>
  )
}
