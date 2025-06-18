import React, { useState } from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import { ThumbUp, ThumbDown } from '@mui/icons-material'
import { mdcolors, argbToHex } from '../../utils/colors'
import AnswerInputBox from './AnswerInputBox'
import formatDate from '../../utils/formatePostTime'
import RichTextEditor from './RichTextEditor'
import { vote } from '../../http/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function AnswerCard({ answer, replyingTo, setReplyingTo }) {
  const [replyText, setReplyText] = useState('')
  const isReplying = replyingTo === answer.id

  const queryClient = useQueryClient()

  const { mutate: castVote, isPending: voting } = useMutation({
    mutationFn: ({ id, type }) => vote(id, type),
    onSuccess: () => {
      queryClient.invalidateQueries(['discussions', answer.ticketId])
    },
    onError: () => {
      alert('Failed to vote')
    },
  })

  const handleVote = (type) => {
    if (!voting) {
      castVote({ id: answer.id, type })
    }
  }

  const handleReplySubmit = () => {
    if (!replyText.trim()) return
    setReplyText('')
    setReplyingTo(null)
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        backgroundColor: argbToHex(mdcolors.surface),
        color: argbToHex(mdcolors.onSurface),
        borderRadius: 2,
      }}
    >
      <RichTextEditor content={answer.content} readOnly />

      <Box width="97%" mt={1} mx="auto" display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="caption" color={argbToHex(mdcolors.outline)}>
          By {answer.user.name} · {formatDate(answer.createdAt).toLocaleString()}
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Box onClick={() => handleVote('UPVOTE')} display="flex" alignItems="center" gap={0.5} sx={{ cursor: 'pointer' }}>
            <ThumbUp fontSize="small" />
            <Typography variant="caption">{answer.upvotes}</Typography>
          </Box>

          <Box onClick={() => handleVote('DOWNVOTE')} display="flex" alignItems="center" gap={0.5} sx={{ cursor: 'pointer' }}>
            <ThumbDown fontSize="small" />
            <Typography variant="caption">{answer.downvotes}</Typography>
          </Box>

          <Button
            size="small"
            variant="text"
            onClick={() => setReplyingTo(isReplying ? null : answer.id)}
            sx={{
              color: argbToHex(mdcolors.primary),
              textTransform: 'none',
              fontSize: '0.75rem',
            }}
          >
            Reply
          </Button>
        </Box>
      </Box>

      {isReplying && (
        <Box mt={2}>
          <AnswerInputBox value={replyText} setValue={setReplyText} onSubmit={handleReplySubmit} />
        </Box>
      )}
    </Paper>
  )
}
