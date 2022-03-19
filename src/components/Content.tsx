import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ContentProps } from './ContentTyping';

export const Content: React.FC<ContentProps> = ({
  mainContentCmp,
  secondContentCmp,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {mainContentCmp}
        </Grid>
        <Grid item xs={12} md={8}>
          {secondContentCmp}
        </Grid>
      </Grid>
    </Box>
  );
}
