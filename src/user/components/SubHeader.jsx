import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { textFieldStyle } from '../styles'
import { argbToHex, mdcolors } from '../../utils/colors'
import { DriveFileRenameOutline, DriveFileRenameOutlineRounded } from '@mui/icons-material'
import useNavigation from '../../utils/navigation'

export default function SubHeader({ query, setQuery }) {

  const {gotoAskQuestion} = useNavigation()

  return (
    <Box
      sx={{
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
      }}
    >
      <TextField
        label="Search"
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          width: '60%',
          ...textFieldStyle
        }} />

      <Button variant='contained'
      onClick={gotoAskQuestion}
        sx={{
          backgroundColor: argbToHex(mdcolors.primaryContainer),
          borderRadius: '1rem',
          padding: '0.75rem 2rem',
          gap: '0.5rem'
        }}
      >
        <Typography variant='body1' textTransform={'none'}>Ask Question</Typography>
        <DriveFileRenameOutlineRounded fontSize='small' />
      </Button>
    </Box>
  )
}