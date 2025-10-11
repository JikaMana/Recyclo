// app/_layout.jsx
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

function RootLayoutContent() {
  const { authState, updateAuthState } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');

        if (token) {
          const decodedToken = jwtDecode(token);
          updateAuthState({
            isAuthorized: true,
            role: decodedToken.role,
            token: token,
          });
        } else {
          updateAuthState({
            isAuthorized: false,
            role: null,
            token: null,
          });
        }
      } catch (err) {
        console.error('Auth check failed', err);

        updateAuthState({
          isAuthorized: false,
          role: null,
          token: null,
        });
      } finally {
        setIsReady(true);
      }
    };
    checkAuthStatus();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          size="large"
          color="#2e7d32"
        />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={authState.isAuthorized}>
        <Stack.Screen
          name="(tabs)"
          options={{ title: 'Tabs', headerShown: false }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!authState.isAuthorized}>
        <Stack.Screen
          name="(auth)"
          options={{ title: 'Auth', headerShown: false }}
        />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}
