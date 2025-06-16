import { Box, Typography } from '@mui/material'
import React from 'react'
import { argbToHex, mdcolors } from '../../utils/colors'
import getRandomImage from '../utils/getRandomImage'
import logo from '../../assets/logo.png'

export default function Header() {
  return (
    <Box
      sx={{
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
      }}
    >
      <img src={logo} style={{ width: 96, height: 64 }} />
      <Typography variant='h4' fontWeight={'bold'} style={{ color: argbToHex(mdcolors.tertiary) }}>
        Ask Questions, Get Answers
      </Typography>
      <img src={getRandomImage()} style={{ width: 48, height: 48, borderRadius: '25%' }} />
    </Box>
  )
}
