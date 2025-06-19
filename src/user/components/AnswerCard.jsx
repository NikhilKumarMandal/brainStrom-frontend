import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import { ThumbUp, ThumbUpOutlined, ThumbDown, ThumbDownOutlined } from '@mui/icons-material'
import { mdcolors, argbToHex } from '../../utils/colors'
import formatDate from '../../utils/formatePostTime'
import RichTextEditor from './RichTextEditor'
import { vote } from '../../http/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../../store/store'

export default function AnswerCard({ answer, isTop = false }) {

  const queryClient = useQueryClient()
  const { user } = useAuthStore()

  console.log(answer);

  const userVoteObj = answer.votes?.find(v => v.userId === user.id)
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
    <Paper
      elevation={2}
      sx={{
        p: 2,
        backgroundColor: isTop ? argbToHex(mdcolors.primaryContainer) : argbToHex(mdcolors.surface),
        color: argbToHex(mdcolors.onSurface),
        borderRadius: 2,
      }}
    >
      <RichTextEditor content={answer.content} readOnly />

      <Box
        width="97%"
        mt={1}
        mx="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="caption" color={argbToHex(mdcolors.outline)}>
          By {answer.user?.name} · {formatDate(answer.createdAt).toLocaleString()}
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Box
            onClick={() => handleVote('UPVOTE')}
            display="flex"
            alignItems="center"
            gap={0.5}
            sx={{ cursor: 'pointer', color: userVote === 'UPVOTE' ? argbToHex(mdcolors.primary) : undefined }}
          >
            {userVote === 'UPVOTE' ? <ThumbUp fontSize="small" /> : <ThumbUpOutlined fontSize="small" />}
            <Typography variant="caption">{answer.upvotes}</Typography>
          </Box>

          <Box
            onClick={() => handleVote('DOWNVOTE')}
            display="flex"
            alignItems="center"
            gap={0.5}
            sx={{ cursor: 'pointer', color: userVote === 'DOWNVOTE' ? argbToHex(mdcolors.primary) : undefined }}
          >
            {userVote === 'DOWNVOTE' ? <ThumbDown fontSize="small" /> : <ThumbDownOutlined fontSize="small" />}
            <Typography variant="caption">{answer.downvotes}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}
