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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../contexts/AuthContext';
import { useUser } from '../../../contexts/UserContext';

export default function UserProfile() {
  const router = useRouter();
  const { logout } = useAuth();
  // const [user, setUser] = useState(null);
  const { user, isLoading } = useUser();

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
  return (
    <View style={{ flex: 1, backgroundColor: '#04432c' }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.leftArrow}>
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
                {/* 🟢 PROFILE AREA */}
                {isLoading ? (
                  <View style={{ alignItems: 'center', marginVertical: 30 }}>
                    <ActivityIndicator
                      size="large"
                      color="#0f7f0f"
                    />
                    <Text
                      style={{
                        color: '#ccc',
                        marginTop: 8,
                        fontSize: 15,
                      }}>
                      Fetching your profile...
                    </Text>
                  </View>
                ) : user ? (
                  <>
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
                  </>
                ) : (
                  <View style={{ alignItems: 'center', marginVertical: 20 }}>
                    <Ionicons
                      name="alert-circle-outline"
                      size={40}
                      color="#fff"
                    />
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: '600',
                        marginTop: 8,
                      }}>
                      Not logged in
                    </Text>
                    <TouchableOpacity
                      onPress={logout}
                      style={[styles.primaryButton, { marginTop: 15 }]}>
                      <Text style={styles.primaryButtonText}>Log in again</Text>
                    </TouchableOpacity>
                  </View>
                )}
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
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#04432c',
  },
  loadingMessage: {
    color: '#ddd',
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#04432c',
    paddingHorizontal: 24,
  },
  errorSubtitle: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#0f7f0f',
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 10,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
