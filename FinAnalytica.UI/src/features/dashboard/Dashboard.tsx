import React from 'react';
import { Box, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Box sx={{ minWidth: '100vw', minHeight: '100vh', backgroundColor: '#135E4B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>   
        <Typography variant="h2" sx={{ color: '#ccdcdb8d', fontWeight: 'bold' }}>Welcome to FinAnalytica Dashboard</Typography>
    </Box>
  );
}

export default Dashboard;