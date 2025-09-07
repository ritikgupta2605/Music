import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for existing token in localStorage
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      const parsedUser = parseMockJWT(storedToken);
      if (parsedUser) {
        setUser(parsedUser);
        setToken(storedToken);
      } else {
        localStorage.removeItem('authToken');
      }
    }
  }, []);

  const login = (username, password) => {
    const foundUser = mockUsers.find(u => u.username === username && u.password === password);
    if (foundUser) {
      const userObj = {
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role
      };
      const newToken = createMockJWT(userObj);
      
      setUser(userObj);
      setToken(newToken);
      localStorage.setItem('authToken', newToken);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock JWT implementation
const createMockJWT = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ 
    sub: user.id, 
    username: user.username, 
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  }));
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
};

const parseMockJWT = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp < now) {
      return null; // Token expired
    }
    
    return {
      id: payload.sub,
      username: payload.username,
      role: payload.role
    };
  } catch {
    return null;
  }
};

// Mock user database
const mockUsers = [
  { id: '1', username: 'admin', password: 'admin123', role: 'admin' },
  { id: '2', username: 'user', password: 'user123', role: 'user' },
  { id: '3', username: 'john', password: 'password', role: 'user' },
  { id: '4', username: 'jane', password: 'password', role: 'admin' }
];

const AuthContext = createContext(undefined);
