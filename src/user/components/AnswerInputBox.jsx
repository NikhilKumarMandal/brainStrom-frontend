import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { mdcolors, argbToHex } from '../../utils/colors'
import RichTextEditor from './RichTextEditor'


export default function AnswerInputBox({ id }) {

  const [answer, setAnswer] = useState('')
  
  const onSubmit = () => {
    console.log(answer)
  }

  return (
    <Box>

      <RichTextEditor content={answer} onChange={setAnswer} />

      {/* <TextField
        multiline
        rows={6}
        fullWidth
        placeholder="Type your answer here..."
        variant="outlined"
        sx={{
          color: argbToHex(mdcolors.onSurface),
          bgcolor: argbToHex(mdcolors.surface),
          borderRadius: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: argbToHex(mdcolors.outline),
            },
            '&:hover fieldset': {
              borderColor: argbToHex(mdcolors.primary),
            },
          },
          '& .MuiInputBase-input': {
            color: argbToHex(mdcolors.onSurface),
          },
        }}
      /> */}

      <Button
        variant="contained"
        onClick={onSubmit}
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
        Submit
      </Button>
    </Box>
  )
}
