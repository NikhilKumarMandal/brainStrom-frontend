import { Box, Chip, Typography } from '@mui/material'
import React from 'react'
import { argbToHex, mdcolors } from '../../utils/colors'
import RichTextEditor from './RichTextEditor'

export default function QuestionCard({ title, description, courses }) {

  return (
    <div>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        {title}
      </Typography>

      <Typography variant='body1' fontFamily="monospace">
      &nbsp;<strong>Description:</strong>
      </Typography>
      <RichTextEditor content={description} readOnly />

      {/* <Box height={10}/> */}

      <Chip
        label={courses}
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
    </div>
  )
}
