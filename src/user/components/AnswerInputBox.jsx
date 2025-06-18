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
    <Box pb={8} >

      <RichTextEditor content={answer} onChange={setAnswer} />

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
