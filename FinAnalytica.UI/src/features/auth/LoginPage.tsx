import React, { useState } from 'react';
import theme from '../../theme/theme';
import '@fontsource/roboto/300.css';
import { Box, TextField, Button, Typography, Paper, Container } from '@mui/material';

interface LoginCredentials {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', credentials);
  };

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #000000 0%, #228f5a 100%)',
      }}
    >
      <Container maxWidth="xs">
        <Paper variant="elevation" elevation={10} sx={{ p: 4, borderRadius: 3, background: '#ffffff9a' }}>
          <Typography variant="h4" align="center" sx={{ color: '#000', fontWeight: 'bold', mb: 3 }}>
            FinAnalytica
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              size="small"
              margin="normal"
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              size="small"
              margin="normal"
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              onChange={handleChange}
              required
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 5, background: 'linear-gradient(135deg, #000000 0%, #228f5a 100%)', '&:hover': { backgroundColor: '#1e6d0a' } }}
            >
              LOGIN
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;