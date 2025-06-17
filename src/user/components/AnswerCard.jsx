import React, { useState } from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import { ThumbUp, ThumbDown } from '@mui/icons-material'
import { mdcolors, argbToHex } from '../../utils/colors'
import AnswerInputBox from './AnswerInputBox'

export default function AnswerCard({ answer, replyingTo, setReplyingTo }) {
  const [replyText, setReplyText] = useState('')
  const isReplying = replyingTo === answer.id

  const handleReplySubmit = () => {
    if (!replyText.trim()) return
    console.log('API call to post reply:', replyText, 'to answer ID:', answer.id)
    // await postReplyAPI(replyText, answer.id)
    setReplyText('')
    setReplyingTo(null)
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        backgroundColor: argbToHex(mdcolors.surfaceContainer),
        color: argbToHex(mdcolors.onSurface),
        borderRadius: 2,
      }}
    >
      <Typography variant="body1" whiteSpace="pre-line">
        {answer.content}
      </Typography>

      <Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="caption" color={argbToHex(mdcolors.outline)}>
          By {answer.author} · {new Date(answer.postedAt).toLocaleString()}
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <ThumbUp fontSize="small" sx={{ cursor: 'pointer' }} />
            <Typography variant="caption">{answer.upvotes}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <ThumbDown fontSize="small" sx={{ cursor: 'pointer' }} />
            <Typography variant="caption">{answer.downvotes}</Typography>
          </Box>
          <Button
            size="small"
            variant="text"
            onClick={() => setReplyingTo(isReplying ? null : answer.id)}
            sx={{
              textTransform: 'none',
              fontSize: '0.75rem',
              minWidth: 'fit-content',
            }}
          >
            Reply
          </Button>
        </Box>
      </Box>

      {isReplying && (
        <Box mt={2}>
          <AnswerInputBox
            value={replyText}
            setValue={setReplyText}
            onSubmit={handleReplySubmit}
          />
        </Box>
      )}
    </Paper>
  )
}
