import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, Stack, Divider } from '@mui/material'
import { mdcolors, argbToHex } from '../utils/colors'
import QuestionCard from '../user/components/QuestionCard'
import QuestionMetaData from '../user/components/QuestionMetaData'
import AnswerInputBox from '../user/components/AnswerInputBox'
import AnswerCard from '../user/components/AnswerCard'
import { useQuery } from '@tanstack/react-query'
import { getTicketById } from '../http/api'

export default function dataPage() {
  const { id } = useParams()

  const { data: ticket, isLoading, isError } = useQuery({
    queryKey: ['ticket', id],
    queryFn: () => getTicketById(id),
    enabled: !!id
  })
  
  if (isLoading) return <Typography variant="h6" color="error" m={4}>Loading...</Typography>
  if (isError) return <Typography variant="h6" color="error" m={4}>Error</Typography>
  if (!ticket) return <Typography variant="h6" color="error" m={4}>data not found</Typography>
  
  const data = ticket?.data.data
  console.log(data);

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

      <QuestionCard title={data.title} description={data.description} courses={data.courses}/>
      
      <QuestionMetaData author={data.author} answers={data._count.discussions} createdAt={data.createdAt} isOpen={data.isOpen} />

      <Divider sx={{ my: 3, borderColor: argbToHex(mdcolors.outlineVariant) }} />

      <AnswerInputBox onSubmit={() => { }} />

      {/* <Stack spacing={2}>
        {answersData.map(answer => (
          <AnswerCard
            key={answer.id}
            answer={answer}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
          />
        ))}
      </Stack> */}

      <Box />
      <Box />
      <Box />
    </Box>
  )
}