import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import InfoCard from "./InfoCard.jsx";

export default function Dashboard() {
  return (
    <Box sx={{ width: '75%', p: 4, alignSelf: 'center', justifyItems: 'center' }}>
      <Grid container spacing={16} >
        <Grid size={6}>
          <InfoCard title={"Total Users"} number={"1024"} />
        </Grid>
        <Grid size={6}>
          <InfoCard title={"Total Tags"} number={"63"} />
        </Grid>
        <Grid size={6}>
          <InfoCard title={"Total Questions"} number={"923"} />
        </Grid>
        <Grid size={6}>
          <InfoCard title={"Total Answers"} number={"2.3k"} />
        </Grid>
        {/* <Grid size={6}>
          <InfoCard title={"Total Answers"} number={"2.3k"} />
        </Grid>
        <Grid size={6}>
          <InfoCard title={"Total Answers"} number={"2.3k"} />
        </Grid> */}
      </Grid>
    </Box>
  );
}
