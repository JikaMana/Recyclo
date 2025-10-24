import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');

        if (!token) {
          // console.error('No token found in storage.');
          // Redirect to login if no token is found
          router.replace('/(auth)/login');
          setIsLoading(false);
          return;
        }

        const response = await fetch(`${BASE_URL}/api/users/profile/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
        } else {
          console.error('Failed to fetch user profile:', response.status);
          if (response.status === 401 || response.status === 403) {
            // Invalidate the token and force re-login
            await AsyncStorage.removeItem('userToken');
            router.replace('/(auth)/login');
          }
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setIsLoading(false);
        // console.log(user);
      }
    };
    fetchProfile();
  }, [user, BASE_URL, router]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
