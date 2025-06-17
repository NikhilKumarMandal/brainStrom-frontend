import { Typography } from '@mui/material';
import React from 'react'
import { argbToHex, mdcolors } from '../utils/colors';

export default function MenuOption({title, action, selected = false}) {
  return (
    <Typography
      variant="h5"
      sx={{
        color: argbToHex(mdcolors.secondary),
        display: 'flex',
        cursor: 'pointer',
        pl: '20px',
        py: '8px',
        width: '80%',
        transition: 'color 0.3s',
        borderRadius: '0px 32px 32px 0px',
        backgroundColor: selected && argbToHex(mdcolors.primaryContainer),
        '&:hover': {
          backgroundColor: argbToHex(mdcolors.secondaryContainer),
        },
      }}
      onClick={action}
    >
      {title}
    </Typography>
  )
}
