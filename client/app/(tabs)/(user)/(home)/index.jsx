import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) setUserName(storedName);
    };
    fetchUser();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Hello, {userName || 'Recycler'} 👋
          </Text>
          <Text style={styles.subtitle}>Welcome back to Recyclo</Text>
        </View>
        <TouchableOpacity style={styles.avatarWrapper}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#F8F8F5"
          />
        </TouchableOpacity>
      </View>

      {/* Center Info */}
      <View style={styles.centerCard}>
        <Image
          source={require('../../../../assets/images/collectors/kuje-collector.png')}
          style={styles.centerImage}
        />
        <View style={styles.centerInfo}>
          <Text style={styles.centerName}>Envirocycling Plastic Centre</Text>
          <Text style={styles.centerDetails}>
            Oyigbo, Abuja • Open 8AM - 5PM
          </Text>
        </View>
      </View>

      {/* Points / Pickup */}
      <View style={styles.sectionRow}>
        <TouchableOpacity style={styles.pointsCard}>
          <Ionicons
            name="wallet-outline"
            size={32}
            color="#2b9646aa"
          />
          <Text style={styles.pointsText}>2450 pts</Text>
          <Text style={styles.pointsSub}>Your Balance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.pickupCard, { justifyContent: 'center' }]}
          onPress={() => router.push('/pickup')}>
          <Ionicons
            name="bicycle-outline"
            size={32}
            color="#F8F8F5"
          />
          <Text style={styles.pickupText}>Schedule Pickup</Text>
        </TouchableOpacity>
      </View>

      {/* Learn & Earn */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learn & Earn</Text>
        <TouchableOpacity
          style={styles.learnCard}
          onPress={() => router.push('/learn')}>
          <Image
            source={require('../../../../assets/images/learn-how-to-sort.png')}
            style={styles.learnImage}
          />
          <View style={styles.learnInfo}>
            <Text style={styles.learnTitle}>Sorting Plastic Right</Text>
            <Text style={styles.learnSubtitle}>
              Learn how to maximize your recycling rewards.
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Recent Activity */}
      <View style={[styles.section, { marginBottom: 20 }]}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          <Ionicons
            name="refresh-circle-outline"
            size={24}
            color="#2b9646aa"
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.activityTitle}>Pickup Completed</Text>
            <Text style={styles.activityTime}>Yesterday • 2:35 PM</Text>
          </View>
        </View>
        <View style={styles.activityCard}>
          <Ionicons
            name="gift-outline"
            size={24}
            color="#FFD166"
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.activityTitle}>Points Redeemed</Text>
            <Text style={styles.activityTime}>3 days ago</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04432c',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: '#F8F8F5',
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    color: '#C4DAD2',
    fontSize: 14,
    marginTop: 2,
  },
  avatarWrapper: {
    backgroundColor: '#2b9646aa',
    padding: 8,
    borderRadius: 50,
  },
  centerCard: {
    backgroundColor: '#F8F8F5',
    borderRadius: 16,
    marginTop: 25,
    overflow: 'hidden',
  },
  centerImage: {
    width: '100%',
    height: 140,
  },
  centerInfo: {
    padding: 15,
  },
  centerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  centerDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  pointsCard: {
    backgroundColor: '#F8F8F5',
    borderRadius: 16,
    padding: 15,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  pointsText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginTop: 5,
  },
  pointsSub: {
    color: '#6B7280',
    fontSize: 12,
  },
  pickupCard: {
    backgroundColor: '#2b9646aa',
    borderRadius: 16,
    padding: 15,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },
  pickupText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8F8F5',
    marginTop: 5,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    color: '#F8F8F5',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  learnCard: {
    backgroundColor: '#e8e8e4ff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  learnImage: {
    width: '100%',
    height: 120,
  },
  learnInfo: {
    padding: 15,
  },
  learnTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  learnSubtitle: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 5,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  activityTime: {
    color: '#6B7280',
    fontSize: 12,
  },
});
