import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BiDownvote, BiSolidDownvote, BiSolidUpvote, BiUpvote } from 'react-icons/bi'
import { vote } from '../http/api'
import { useAuthStore } from '../store/store'
import formatDate from '../utils/formatePostTime'
import RichTextEditor from './RichTextEditor'

export default function AnswerCard({ answer }) {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()

  const userVoteObj = answer.votes?.find((v) => v.userId === user.id)
  const userVote = userVoteObj?.type

  const { mutate: castVote, isPending: voting } = useMutation({
    mutationFn: ({ id, type }) => vote(id, type),
    onSuccess: () => queryClient.invalidateQueries(['discussions', answer.ticketId]),
    onError: () => alert('Failed to vote'),
  })

  const handleVote = (type) => {
    if (!voting) castVote({ id: answer.id, type })
  }

  return (
    <div
      className="rounded-xl p-4 mx-6 bg-gray-800 text-gray-200 shadow-md transition"
    >
      <RichTextEditor content={answer.content} readOnly />

      <div className="w-[97%] mx-auto mt-3 flex justify-between items-center text-sm text-gray-400">
        <span>
          By {answer.user?.name} · {formatDate(answer.createdAt)}
        </span>

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleVote('UPVOTE')}
            className={`flex items-center gap-1 cursor-pointer hover:border-none hover:scale-90 focus:outline-none focus:ring-0 ${userVote === 'UPVOTE' ? 'text-green-500' : ''}`}
          >
            {userVote === 'UPVOTE' ? (
              <BiSolidUpvote />
            ) : (
              <BiUpvote />
            )}
            <span>{answer.upvotes}</span>
          </button>

          <button
            onClick={() => handleVote('DOWNVOTE')}
            className={`flex items-center gap-1 cursor-pointer hover:border-none hover:scale-90 focus:outline-none focus:ring-0 ${userVote === 'DOWNVOTE' ? 'text-red-500' : ''}`}
          >
            {userVote === 'DOWNVOTE' ? (
              <BiSolidDownvote />
            ) : (
              <BiDownvote />
            )}
            <span>{answer.downvotes}</span>
          </button>

        </div>
      </div>
    </div>
  )
}
