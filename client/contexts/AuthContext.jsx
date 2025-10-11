import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthorized: false,
    role: null,
    token: null,
  });

  // Check auth state on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const decodedToken = jwtDecode(token);
          setAuthState({
            isAuthorized: true,
            role: decodedToken.role,
            token: token,
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuthStatus();
  }, []);

  const updateAuthState = (newState) => {
    setAuthState(newState);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setAuthState({
        isAuthorized: false,
        role: null,
        token: null,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, updateAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
