import React, { useState } from 'react';
import {
  Box, Container, Paper, Typography, TextField, Button,
  Alert, InputAdornment, IconButton, CircularProgress
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#f5f7f9' }}>
      <Container maxWidth="xs">
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: '1px solid #eee', borderRadius: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#29abe2' }}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Sign in to your Suryam Clinic admin account
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth label="Email Address" type="email" value={email} margin="normal"
              onChange={(e) => setEmail(e.target.value)} required
              InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon color="action" /></InputAdornment> }}
            />
            <TextField
              fullWidth label="Password" type={showPassword ? 'text' : 'password'} value={password} margin="normal"
              onChange={(e) => setPassword(e.target.value)} required
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockIcon color="action" /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth type="submit" variant="contained" disableElevation disabled={loading}
              sx={{ mt: 4, py: 1.5, bgcolor: '#29abe2', '&:hover': { bgcolor: '#2498c9' }, borderRadius: 2, fontWeight: 'bold' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In Now'}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
