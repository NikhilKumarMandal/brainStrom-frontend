import { Box, Chip, Stack, Typography } from '@mui/material'
import React from 'react'
import { argbToHex, mdcolors } from '../../utils/colors'

export default function QuestionCard({
  title, description, tags
}) {
  return (
    <div>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        {title}
      </Typography>

      <Typography variant='body1' fontFamily="monospace">
        <strong>Description:</strong> <br />
        &nbsp;&nbsp;&nbsp;&nbsp; {description}
      </Typography>

      <Box>
        <Typography fontWeight="bold" gutterBottom>Tags:</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onClick={(e) => {
                e.stopPropagation()
                alert(tag)
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
          ))}
        </Stack>
      </Box>
    </div>
  )
}
