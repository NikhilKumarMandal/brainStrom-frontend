import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Stack, Divider } from '@mui/material'
import { mdcolors, argbToHex } from '../utils/colors'
import QuestionCard from '../user/components/QuestionCard'
import QuestionMetaData from '../user/components/QuestionMetaData'
import AnswerInputBox from '../user/components/AnswerInputBox'
import AnswerCard from '../user/components/AnswerCard'
import { useQuery } from '@tanstack/react-query'
import { getTicketById, getAllDiscussion } from '../http/api'

export default function ProblemPage() {
  const { id } = useParams()
  const [replyingTo, setReplyingTo] = useState(null)

  const { data: ticket, isLoading: ticketLoading, isError: ticketError } = useQuery({
    queryKey: ['ticket', id],
    queryFn: () => getTicketById(id),
    enabled: !!id
  })

  const { data: discussions, isLoading: discussionLoading, isError: discussionError } = useQuery({
    queryKey: ['discussions', id],
    queryFn: () => getAllDiscussion(id),
    enabled: !!id
  })

  if (ticketLoading || discussionLoading)
    return <Typography variant="h6" color="error" m={4}>Loading...</Typography>

  if (ticketError || discussionError)
    return <Typography variant="h6" color="error" m={4}>Error</Typography>

  const data = ticket?.data?.data
  const answersData = discussions?.data?.data || []
  
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
      {/* <Divider sx={{ my: 3, borderColor: argbToHex(mdcolors.outlineVariant) }} /> */}
      <AnswerInputBox id={id} />
      <Divider sx={{ my: 4, borderColor: argbToHex(mdcolors.outlineVariant) }} />
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
    </Box>
  )
}
