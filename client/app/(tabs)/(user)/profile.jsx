import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { logout } from '../../../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../contexts/AuthContext';

export default function UserProfile() {
  const router = useRouter();
  const { logout } = useAuth();
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        console.error('Network or server error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const profileOptions = [
    {
      id: '1',
      title: 'Edit Profile',
      icon: 'person-outline',
      action: () => console.log('Navigate to Edit Profile'),
    },
    {
      id: '2',
      title: 'Notifications',
      icon: 'notifications-outline',
      action: () => router.push('/(tabs)/(user)/(home)/notification'),
    },
    {
      id: '3',
      title: 'Change Password',
      icon: 'lock-closed-outline',
      action: () => console.log('Navigate to Change Password'),
    },
    {
      id: '4',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      action: () => console.log('Navigate to Help & Support'),
    },
    {
      id: '5',
      title: 'Privacy Policy',
      icon: 'document-text-outline',
      action: () => console.log('Navigate to Privacy Policy'),
    },
    {
      id: '6',
      title: 'Log Out',
      icon: 'log-out-outline',
      action: logout,
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={item.action}
      style={styles.optionItem}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons
          name={item.icon}
          size={24}
          color="#ddd"
        />
        <Text style={styles.optionTitle}>{item.title}</Text>
      </View>
      <Ionicons
        name="chevron-forward-outline"
        size={24}
        color="#888"
      />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color="#1e90ff"
        />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>Could not load your profile</Text>
        <Text style={styles.errorMessage}>
          Please log in again to continue.
        </Text>
        <TouchableOpacity
          onPress={logout}
          style={styles.retryButton}>
          <Text style={styles.retryText}>Log in again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#04432c' }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <TouchableOpacity
            // onPress={() => navigation.goBack()}
            style={styles.leftArrow}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#ddd"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>
        <View style={styles.mainContainer}>
          <FlatList
            data={profileOptions}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <View style={styles.profilePhotoContainer}>
                  <Image
                    source={require('../../../assets/images/icon.jpg')}
                    style={styles.profilePhoto}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    lineHeight: 28,
                    color: '#ddd',
                    marginTop: 10,
                  }}>
                  {user.name}
                </Text>
                <Text style={{ fontSize: 14, color: '#0f7f0f' }}>
                  {user.email}
                </Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#ddd',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  leftArrow: {
    position: 'absolute',
    left: 20,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  profilePhotoContainer: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#ddd',
  },
  profilePhoto: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ddd',
    marginLeft: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#333',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  errorMessage: {
    color: '#777',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
});
