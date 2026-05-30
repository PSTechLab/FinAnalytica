import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Stack, TextField, Button, Typography, Paper } from '@mui/material';
import loginImage from '../../assets/Business Plan-bro.svg';
import { loginUser } from './api/authService';
import Logo from '../../components/Logo';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minWidth: '100vw', minHeight: '100vh', backgroundColor: '#ccdcdb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={20} sx={{ minWidth: '75vw', minHeight: '60vh', backgroundColor: '#ccdcdb71', borderRadius: '15px' }}>
        <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid size={7}>
            <Paper variant='outlined' sx={{ borderRadius: '15px', backgroundColor: '#135e4bb5'}}>
              <img src={loginImage} alt="Login" />
            </Paper>
          </Grid>
          <Grid size={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
            <Stack spacing={2} sx={{ display: 'flex', alignItems: 'space-around', justifyContent: 'center' }}>
              <Logo iconSize="90px" textSize="h2" color="#135E4B" />
              <form onSubmit={handleLogin} style={{ padding: '20px' }}>
                <Stack spacing={3} sx={{ padding: '20px' }}>
                  <Typography variant="h4" sx={{ color: '#135E4B', textAlign: 'center' }}>Welcome Back!</Typography>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    size="small"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button type="submit" variant="contained" sx={{ backgroundColor: '#135e4bd3' }} disabled={loading}>
                    {loading ? 'Logging in...' : 'LOGIN'}
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default LoginPage;