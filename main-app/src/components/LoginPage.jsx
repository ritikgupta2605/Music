import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Card,
  CardContent,
  Divider,
  Stack
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext.jsx';

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 6
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 600,
            bgcolor: 'rgba(30, 30, 30, 0.95)',
            border: '1px solid rgba(85, 85, 85, 0.3)',
            borderRadius: 4,
            boxShadow: '0 16px 64px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <CardContent sx={{ p: 6 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Box
                component="svg"
                viewBox="0 0 24 24"
                sx={{
                  width: 64,
                  height: 64,
                  fill: '#1DB954',
                  mb: 3
                }}
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </Box>
              <Typography variant="h3" component="h1" sx={{ 
                color: 'white', 
                fontWeight: 700, 
                mb: 2,
                background: 'linear-gradient(45deg, #1DB954, #1ed760)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                🎵 Music Library
              </Typography>
              <Typography variant="h6" sx={{ color: '#b3b3b3', fontSize: '1.1rem' }}>
                Sign in to access your music collection
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3, bgcolor: '#2d1b1b', color: '#f44336' }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <TextField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  size="large"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(42, 42, 42, 0.8)',
                      color: 'white',
                      fontSize: '1.1rem',
                      py: 1,
                      '& fieldset': {
                        borderColor: 'rgba(85, 85, 85, 0.5)',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: '#1DB954',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1DB954',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#b3b3b3',
                      fontSize: '1rem',
                      '&.Mui-focused': {
                        color: '#1DB954',
                      }
                    },
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  size="large"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(42, 42, 42, 0.8)',
                      color: 'white',
                      fontSize: '1.1rem',
                      py: 1,
                      '& fieldset': {
                        borderColor: 'rgba(85, 85, 85, 0.5)',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: '#1DB954',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1DB954',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#b3b3b3',
                      fontSize: '1rem',
                      '&.Mui-focused': {
                        color: '#1DB954',
                      }
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    bgcolor: '#1DB954',
                    color: 'white',
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(29, 185, 84, 0.3)',
                    '&:hover': {
                      bgcolor: '#1ed760',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(29, 185, 84, 0.4)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </Box>

            <Divider sx={{ my: 4, borderColor: 'rgba(85, 85, 85, 0.3)' }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#b3b3b3', mb: 3, fontSize: '1rem' }}>
                Demo Credentials:
              </Typography>
              <Stack spacing={2} sx={{ fontSize: '1rem' }}>
                <Box sx={{ 
                  color: '#1DB954', 
                  bgcolor: 'rgba(29, 185, 84, 0.1)',
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid rgba(29, 185, 84, 0.2)'
                }}>
                  <strong>Admin:</strong> admin / admin123
                </Box>
                <Box sx={{ 
                  color: '#1DB954', 
                  bgcolor: 'rgba(29, 185, 84, 0.1)',
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid rgba(29, 185, 84, 0.2)'
                }}>
                  <strong>User:</strong> user / user123
                </Box>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginPage;
