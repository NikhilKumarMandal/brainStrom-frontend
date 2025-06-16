import React from 'react'
import { mockQuestions } from '../utils/mockData'
import { Box, Chip, Typography } from '@mui/material'
import { argbToHex, mdcolors } from '../../utils/colors'

export default function QuestionList() {
  const questions = mockQuestions
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
      {questions.map((q, i) => (
        <EachQuestion key={i} q={q} i={i} questionsLength={questions.length} />
      ))}
    </Box>
  )
}

function EachQuestion({ q, i, questionsLength }) {
  return (
    <Box
      onClick={() => alert(q.title)}
      sx={{
        borderBottom: i < questionsLength - 1 ? `1px solid ${argbToHex(mdcolors.outlineVariant)}` : 'none',
        py: 2,
        cursor: 'pointer',
      }}
    >
      <Typography fontWeight="medium">{q.title}</Typography>
      <Typography variant="body2" color={argbToHex(mdcolors.outline)}>
        {q.answers} answer · {q.views} views
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
        {q.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onClick={(e) => {
              e.stopPropagation()
              alert(tag)
            }}
            size="small"
            sx={{
              backgroundColor: 'transparent',
              border: `1px solid ${argbToHex(mdcolors.outlineVariant)}`,
              color: argbToHex(mdcolors.onSurface),
            }}
          />
        ))}
      </Box>
    </Box>
  )
}
