import React from 'react'
import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  useMediaQuery
} from '@mui/material'
import { Google } from '@mui/icons-material'
import { argbToHex, mdcolors } from '../utils/colors'

export default function LoginPage() {
  const isMobile = useMediaQuery('(max-width:600px)')

  const handleGoogleLogin = () => {
    alert('Google login clicked')
    // integrate Firebase/Google OAuth here
  }

  return (
    <Paper
      elevation={4}
      sx={{
        width: isMobile ? '90%' : '600px',
        height: isMobile ? '80%' : '500px',
        padding: 4,
        borderRadius: '2rem',
        backgroundColor: argbToHex(mdcolors.surface),
        boxShadow: `0px 4px 20px ${argbToHex(mdcolors.shadow)}`,
        display: 'flex',
        m: 'auto',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
        <Typography
          variant='h3'
          fontWeight='bold'
          sx={{
            textAlign: 'center',
            color: argbToHex(mdcolors.primary),
            pb: 1
          }}
        >
          Welcome Back
        </Typography>

        <Typography variant='body1' sx={{ textAlign: 'center', color: argbToHex(mdcolors.onSurfaceVariant), pb: 4 }}>
          Login to your account to continue
        </Typography>

        <Button
          variant='outlined'
          onClick={handleGoogleLogin}
          startIcon={<Google />}
          sx={{
            borderColor: argbToHex(mdcolors.primary),
            color: argbToHex(mdcolors.primary),
            textTransform: 'none',
            width: '70%',
            alignSelf: 'center',
            borderRadius: '2rem',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: argbToHex(mdcolors.secondaryContainer),
              borderColor: argbToHex(mdcolors.primary),
            }
          }}
        >
          Sign in with Google
        </Button>
      </Box>

      <Typography
        variant='caption'
        sx={{
          color: argbToHex(mdcolors.outlineVariant),
          textAlign: 'center',
        }}
      >
        By signing in, you agree to our Terms and Privacy Policy
      </Typography>
    </Paper>

  )
}
