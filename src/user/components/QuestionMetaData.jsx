import { Box, Chip, Typography } from '@mui/material'
import React from 'react'
import { argbToHex, mdcolors } from '../../utils/colors'
import formatDate from '../../utils/formatePostTime'
import { useAuthStore } from '../../store/store'

export default function QuestionMetaData({
  author, answers, views, createdAt, isOpen
}) {

  // const {user } = useAuthStore()
  // console.log(user);
  
  // const isAuthorOrAdmin = user.role ? === 'USER' : true

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant='body2' color={argbToHex(mdcolors.outline)}>
          <strong>By:</strong> {author}
        </Typography>
        <Typography variant="body2" color={argbToHex(mdcolors.outline)}>
          {answers} answers · {formatDate(createdAt)}
        </Typography>
      </Box>

      <Chip
        label={isOpen ? 'Open' : 'Closed'}
        variant="outlined"
        // clickable={isAuthorOrAdmin}
        // onClick={() => {
        //   if (isAuthorOrAdmin) setIsOpen(prev => !prev)
        // }}
        sx={{
          // cursor: isAuthorOrAdmin ? 'pointer' : 'default',
          borderColor: isOpen ? 'green' : 'red',
          color: isOpen ? 'green' : 'red',
          fontWeight: 'bold',
          fontSize: '0.8rem',
        }}
      />
    </Box>
  )
}
