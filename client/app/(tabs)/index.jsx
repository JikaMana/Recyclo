import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export default function TabsIndex() {
  const router = useRouter();

  useEffect(() => {
    const redirectToRoleBasedScreen = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const decodedToken = jwtDecode(token);

          if (decodedToken.role === 'collector') {
            router.replace('/(tabs)/(collector)/dashboard');
          } else {
            router.replace('/(tabs)/(user)/(home)');
          }
        } else {
          router.replace('/(auth)');
        }
      } catch (error) {
        console.error('Redirect failed:', error);
        router.replace('/(auth)');
      }
    };

    redirectToRoleBasedScreen();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator
        size="large"
        color="#2e7d32"
      />
    </View>
  );
}
