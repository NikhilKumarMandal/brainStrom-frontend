import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import { mdcolors, argbToHex } from '../../utils/colors'
import RichTextEditor from './RichTextEditor'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createDiscussion } from '../../http/api'

export default function AnswerInputBox({ id }) {
  const [answer, setAnswer] = useState('')
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => createDiscussion(formData),
    onSuccess: () => {
      setAnswer('')
      queryClient.invalidateQueries(['discussions', id])
    },
    onError: () => {
      alert('Failed to submit answer')
    }
  })

  const onSubmit = () => {
    if (!answer.trim()) return alert('Answer is empty')
    mutate({ ticketId: id, content: answer })
  }

  return (
    <Box>
      <RichTextEditor content={answer} onChange={setAnswer} />
      <Button
        variant="contained"
        onClick={onSubmit}
        disabled={isPending}
        sx={{
          alignSelf: 'flex-end',
          bgcolor: argbToHex(mdcolors.primaryContainer),
          borderRadius: '1.5rem',
          textTransform: 'none',
          px: 4,
          mt: 1,
          ':hover': {
            bgcolor: argbToHex(mdcolors.primaryContainer),
            borderColor: argbToHex(mdcolors.primary),
          },
        }}
      >
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
    </Box>
  )
}
