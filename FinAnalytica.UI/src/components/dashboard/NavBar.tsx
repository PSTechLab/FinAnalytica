import React from 'react'
import { Avatar, Badge, Box, Paper, Typography } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';import image from '../../assets/Business Plan-bro.svg';

const NavBar = () => {
  return (
    <Paper elevation={5} sx={{ height: '8vh', backgroundColor: '#ccdcdb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', borderRadius: 'none' }}>
      <Typography variant="h5" sx={{ color: '#135E4B', fontStyle: 'Roboto', fontWeight: '700' }}>DASHBOARD</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <Badge badgeContent={4} color="error">
            <NotificationsNoneIcon sx={{ color: '#2A2A2A' }} />
        </Badge>
        <Avatar alt="Admin" src={image} />
        <Typography variant="h6" sx={{ color: '#2A2A2A', fontStyle: 'Roboto', fontWeight: '300' }}>Admin</Typography>
      </Box>
    </Paper>
  )
}

export default NavBar