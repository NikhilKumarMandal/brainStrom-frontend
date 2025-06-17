import React from 'react'
import { Card, Typography } from "@mui/material";
import { argbToHex, mdcolors } from "../utils/colors.js";

export default function InfoCard({ title, number, action }) {
  return (
    <Card
      onClick={action}
      sx={{
        display: 'flex',
        height: '25vh',
        flexDirection: 'column',
        backgroundColor: argbToHex(mdcolors.surfaceVariant),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: '2rem',
        cursor: 'pointer',
        boxShadow: `8px 16px 32px ${argbToHex(mdcolors.shadow)}`,
      }}
    >
      <Typography
        variant='h4'
        fontWeight={'bold'}
        style={{ color: argbToHex(mdcolors.primary) }}
      >
        {title}
      </Typography>

      <Typography
        variant='h3'
        style={{ color: argbToHex(mdcolors.secondary) }}
      >
        {number}
      </Typography>
    </Card>
  )
}
