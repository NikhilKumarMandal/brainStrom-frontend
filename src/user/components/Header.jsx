import { Box, Typography, Menu, MenuItem, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { argbToHex, mdcolors } from '../../utils/colors'
import getRandomImage from '../utils/getRandomImage'
import logo from '../../assets/logo.png'
import { logout } from '../../http/api'
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from '../../store/store'


export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null)
  const { logout: logoutUserFromStore } = useAuthStore()

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: async () => {
      logoutUserFromStore();
      return;
    }
  })

  const handleLogout = () => {
    alert('Logging out...') // Replace with your logout logic
    handleClose()
  }

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
      <img src={logo} style={{ width: 96, height: 64 }} alt="Logo" />
      <Typography variant='h4' fontWeight='bold' style={{ color: argbToHex(mdcolors.tertiary) }}>
        Ask Questions, Get Answers
      </Typography>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          '&:focus': {
            outline: 'none',
          },
          '&:focus-visible': {
            outline: 'none',
          },
          '&:active': {
            boxShadow: 'none',
          },
        }}
      >
        <img
          src={getRandomImage()}
          alt="Profile"
          style={{ width: 48, height: 48, borderRadius: '25%' }}
        />
      </IconButton>


      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={logoutMutate}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}
