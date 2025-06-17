import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { mockQuestions, mockAnswers } from '../user/utils/mockData'
import { Box, Typography, Stack, Divider } from '@mui/material'
import { mdcolors, argbToHex } from '../utils/colors'
import QuestionCard from '../user/components/QuestionCard'
import QuestionMetaData from '../user/components/QuestionMetaData'
import AnswerInputBox from '../user/components/AnswerInputBox'
import AnswerCard from '../user/components/AnswerCard'

export default function ProblemPage() {
  const { id } = useParams()
  const problem = mockQuestions.find(q => q.id === Number(id))
  const answersData = mockAnswers.find(a => a.questionId === Number(id))?.answers || []
  const [replyingTo, setReplyingTo] = useState(null)
  const isAuthorOrAdmin = problem.author === 'yourUsername' || true // change as needed
  const [isOpen, setIsOpen] = useState(true)

  if (!problem) {
    return <Typography variant="h6" color="error" m={4}>Problem not found</Typography>
  }

  const postedAt = new Date(problem.postTime).toLocaleString()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        gap: '1rem',
        py: 4,
        px: 4,
        color: argbToHex(mdcolors.onBackground),
      }}
    >

      <QuestionCard title={problem.title} description={problem.description} tags={problem.tags} />
      <QuestionMetaData author={problem.author} answers={problem.answers} views={problem.views} postedAt={problem.postedAt} isAuthorOrAdmin={isAuthorOrAdmin} setIsOpen={setIsOpen} isOpen={isOpen} />

      <Divider sx={{ my: 3, borderColor: argbToHex(mdcolors.outlineVariant) }} />

      <AnswerInputBox onSubmit={() => { }} />

      <Stack spacing={2}>
        {answersData.map(answer => (
          <AnswerCard
            key={answer.id}
            answer={answer}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
          />
        ))}
      </Stack>

      <Box />
      <Box />
      <Box />
    </Box>
  )
}