import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Stack, Divider, CircularProgress } from '@mui/material'
import { WarningAmberRounded } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { mdcolors, argbToHex } from '../utils/colors'
import { getTicketById, getTopDiscussion } from '../http/api'
import QuestionCard from '../user/components/QuestionCard'
import QuestionMetaData from '../user/components/QuestionMetaData'
import AnswerInputBox from '../user/components/AnswerInputBox'
import AnswerCard from '../user/components/AnswerCard'

export default function ProblemPage() {
  const { id } = useParams()

  const { data: ticket, isLoading: ticketLoading, isError: ticketError } = useQuery({
    queryKey: ['ticket', id],
    queryFn: () => getTicketById(id),
    enabled: !!id
  })

  const { data: topDiscussion, isLoading: discussionLoading, isError: discussionError } = useQuery({
    queryKey: ['topDiscussion', id],
    queryFn: () => getTopDiscussion(id),
    enabled: !!id
  })
  
  if (ticketLoading || discussionLoading)
    return <Box variant="h6" sx={{ m: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
      <CircularProgress size={60} /> Loading... </Box>

  if (ticketError || discussionError)
    return <Box variant="h6" sx={{ color: argbToHex(mdcolors.error), m: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, fontSize: '1.5rem' }} >
      <WarningAmberRounded sx={{ fontSize: '4rem' }} /> Something went wrong </Box>

  const data = ticket?.data?.data
  const answersData = topDiscussion?.data?.data || []

  return (
    <Box
      sx={{
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        scrollbarWidth: 'thin',
        gap: '1rem',
        py: 4,
        px: 4,
        color: argbToHex(mdcolors.onBackground),
      }}
    >
      <QuestionCard title={data.title} description={data.description} courses={data.courses} />
      <QuestionMetaData author={data.author} answers={data._count.discussions} createdAt={data.createdAt} isOpen={data.isOpen} />

      <AnswerInputBox id={id} />
      <Divider sx={{ my: 4, borderColor: argbToHex(mdcolors.outlineVariant) }} />
      <Stack spacing={2}>
        {answersData.map(answer => (
          <AnswerCard
            key={answer.id}
            answer={answer}
          />
        ))}
      </Stack>
    </Box>
  )
}
