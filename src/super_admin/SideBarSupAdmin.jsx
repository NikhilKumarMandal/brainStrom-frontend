import React from 'react'
import { argbToHex, mdcolors } from '../utils/colors'
import { Box, Typography } from '@mui/material'
import MenuOption from './MenuOption'
import useNavigation from '../utils/navigation'

export default function SideBarSupAdmin() {

  const { gotoDashboard, gotoDumpCSV } = useNavigation()
  const location = window.location.pathname

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
        Super Admin
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
        <MenuOption title='Overview' action={() => { gotoDashboard() }} selected={location === '/dashboard'} />
        <MenuOption title='Growth' action={() => { alert('Growth clicked') }} selected={location === '/growth'} />
        <MenuOption title='Engagement' action={() => { alert('Engagement clicked') }} selected={location === '/engagement'} />
        <MenuOption title='Activity Feed' action={() => { alert('Activity Feed clicked') }} selected={location === '/activity-feed'} />
        <MenuOption title='Dump CSV' action={() => { gotoDumpCSV() }} selected={location === '/dump-csv'} />
      </Box>
    </div>
  )
}