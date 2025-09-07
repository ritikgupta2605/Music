import React, { Suspense, useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Container
} from '@mui/material';
import { useAuth, AuthProvider } from './contexts/AuthContext.jsx';
import LoginPage from './components/LoginPage.jsx';

// Import the actual Music Library component
import MusicLibraryComponent from './components/MusicLibraryComponent.jsx';

const AppContent = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [microFrontendError, setMicroFrontendError] = useState(null);

  useEffect(() => {
    // Reset error when user changes
    setMicroFrontendError(null);
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#121212' }}>
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: '#1DB954',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}
      >
        <Toolbar>
          <Box
            component="svg"
            viewBox="0 0 24 24"
            sx={{
              width: 32,
              height: 32,
              fill: 'white',
              mr: 2
            }}
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Music App
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ color: 'white' }}>
              Welcome, {user?.username}
            </Typography>
            <Box
              sx={{
                bgcolor: isAdmin ? '#ff6b35' : '#4a90e2',
                color: 'white',
                px: 2,
                py: 0.5,
                borderRadius: 1,
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase'
              }}
            >
              {user?.role}
            </Box>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                color: 'white',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {microFrontendError && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            onClose={() => setMicroFrontendError(null)}
          >
            {microFrontendError}
          </Alert>
        )}

        <MusicLibraryComponent isAdmin={isAdmin} />
      </Container>
    </Box>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
