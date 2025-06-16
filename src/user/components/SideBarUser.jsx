import React from 'react'
import { argbToHex, mdcolors } from '../../utils/colors'
import { Box, Typography } from '@mui/material'
import MenuOption from '../../super_admin/MenuOption'
import useNavigation from '../../utils/navigation'

export default function SideBarUser() {
  const location = window.location.pathname

  const { gotoHomePage } = useNavigation()

  return (
    <div
      style={{
        backgroundColor: argbToHex(mdcolors.surface),
        borderColor: argbToHex(mdcolors.outline),
        borderStyle: 'solid',
        borderLeftWidth: '0px',
        height: '90vh',
        alignSelf: 'center',
        borderRadius: '0px 32px 32px 0px',
        width: '20%',
        paddingTop: '20px',
        paddingDown: '20px',
      }}
    >
      <Typography
        variant='h4'
        fontWeight={'bold'}
        style={{ color: argbToHex(mdcolors.primary) }}
        justifyContent={'center'}
        display={'flex'}
      >
        User
      </Typography>

      <Box sx={{
        display: { xs: 'none', sm: 'block' },
        py: '20px',
      }} />

      <Box
        height={'auto'}
        display={'flex'}
        flexDirection={'column'}
        gap={'1rem'}
      >
        <MenuOption title='Homepage' action={() => { gotoHomePage() }} selected={location === '/home'} />
      </Box>

    </div>
  )
}