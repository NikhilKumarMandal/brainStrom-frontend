import React from 'react'
import { mockQuestions } from '../utils/mockData'
import { Box, Chip, Stack, Typography } from '@mui/material'
import { argbToHex, mdcolors } from '../../utils/colors';
import { getAllTicket } from '../../http/api';
import { useQuery } from '@tanstack/react-query';
import useNavigation from '../../utils/navigation';

const getAllTickets = async () => {
  const { data } = await getAllTicket();
  return data;
}

export default function QuestionList() {

  const { data: allTickets, } = useQuery({
    queryKey: ["tickets"],
    queryFn: getAllTickets,
  });

  console.log(allTickets);
  if (!allTickets) return <Typography>Loading...</Typography>
  const data = allTickets.data

  return (
    <Box
      sx={{
        width: '90%',
        px: 4,
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'center',
        backgroundColor: argbToHex(mdcolors.surface),
        borderRadius: '2rem',
        flex: 1, overflowY: 'auto',
        scrollbarWidth: 'thin',
        boxShadow: `4px 16px 16px ${argbToHex(mdcolors.shadow)}`,
      }}
    >
      {data.map((q, i) => (
        <EachQuestion key={i} q={q} i={i} questionsLength={q.length} />
      ))}
    </Box>
  )
}

function EachQuestion({ q, i, questionsLength }) {
  const { gotoProblemPage } = useNavigation()
  const isOpen = q.status === 'OPEN'

  return (
    <Box
      onClick={() => gotoProblemPage(q.id)}
      sx={{
        borderBottom: i < questionsLength - 1 ? `1px solid ${argbToHex(mdcolors.outlineVariant)}` : 'none',
        py: 2,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* Left Side: Title and Meta Info */}
      <Box>
        <Typography fontWeight="medium">{q.title}</Typography>
        <Typography variant="body2" color={argbToHex(mdcolors.outline)}>
          {q._count.discussions} answers
        </Typography>
      </Box>

      {/* Right Side: Chips */}
      <Stack direction="column" spacing={1} alignItems="flex-end">
        <Chip
          label={isOpen? 'Open' : 'Closed'}
          variant="outlined"
          sx={{
            borderColor: isOpen ? 'green' : 'red',
            color: isOpen ? 'green' : 'red',
            fontWeight: 'bold',
            fontSize: '0.8rem',
          }}
        />
        <Chip
          label={q.courses}
          onClick={(e) => {
            e.stopPropagation()
            alert('course')
          }}
          size="small"
          sx={{
            border: `1px solid ${argbToHex(mdcolors.outlineVariant)}`,
            color: argbToHex(mdcolors.onSurface),
            '&:hover': {
              transform: 'scale(1.1)',
              cursor: 'pointer',
            },
          }}
        />
      </Stack>
    </Box>

  )
}
