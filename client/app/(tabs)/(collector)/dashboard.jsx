import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome6,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../../contexts/UserContext';

export default function CollectorDashboard() {
  const router = useRouter();
  const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

  const { user, isLoading } = useUser();

  // Sample data
  const metrics = {
    pending: 15,
    completed: 1120,
    earnings: '4,520,000',
  };

  const nextPickup = {
    id: 'p-123',
    name: 'Ibrahim ibn Manlawo ',
    address: 'Abuad Mosque, MSSN Office',
    time: 'Today, 2:25 PM',
    items: 'CC nylon with pack',
  };

  const recent = [
    {
      id: 'r1',
      title: 'Pickup completed',
      subtitle: 'Musa Aliyu — Sabon Gari',
      time: '2h ago',
    },
    {
      id: 'r2',
      title: 'New pickup request',
      subtitle: 'Fatima Hassan — Kado',
      time: '4h ago',
    },
    {
      id: 'r3',
      title: 'Pickup completed',
      subtitle: 'John Doe — Gwarinpa',
      time: '1d ago',
    },
  ];

  return (
    <View style={styles.page}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={['top', 'left', 'right']}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSub}>Welcome back,</Text>
            <Text style={styles.headerName}>
              {user?.name || 'Recyclo User'}
            </Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/(collector)/notifications')}
              style={styles.iconButton}>
              <FontAwesome6
                name="bell"
                size={20}
                color="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                router.push('/(tabs)/(collector)/collectorProfile')
              }>
              <Image
                source={require('../../../assets/images/icon.jpg')}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Metrics */}
          <View style={styles.metricsRow}>
            <View style={[styles.metricCard, { backgroundColor: '#085a3c' }]}>
              <Ionicons
                name="time-outline"
                size={24}
                color="#b8e0c6"
              />
              <Text style={styles.metricLabel}>Pending</Text>
              <Text style={styles.metricValue}>{metrics.pending}</Text>
              <Text style={styles.metricSmall}>Priority</Text>
            </View>

            <View style={[styles.metricCard, { backgroundColor: '#0a6b46' }]}>
              <Ionicons
                name="checkmark-done-outline"
                size={24}
                color="#b8e0c6"
              />
              <Text style={styles.metricLabel}>Completed</Text>
              <Text style={styles.metricValue}>{metrics.completed}</Text>
              <Text style={styles.metricSmall}>This Month</Text>
            </View>

            <View style={[styles.metricCard, { backgroundColor: '#085a3c' }]}>
              <Ionicons
                name="cash-outline"
                size={24}
                color="#b8e0c6"
              />
              <Text style={styles.metricLabel}>Earnings(₦)</Text>
              <Text style={styles.metricValue}>{metrics.earnings}</Text>
              <Text style={styles.metricSmall}>Balance</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#0a6b46' }]}
              onPress={() => router.push('/(tabs)/(collector)/request')}>
              <MaterialCommunityIcons
                name="format-list-bulleted"
                size={22}
                color="#fff"
              />
              <Text style={styles.actionText}>Requests</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#085a3c' }]}
              onPress={() => router.push('/(tabs)/(collector)/map')}>
              <Ionicons
                name="location"
                size={22}
                color="#fff"
              />
              <Text style={styles.actionText}>Map</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#0a6b46' }]}
              onPress={() =>
                router.push('/(tabs)/(collector)/dashboard-start')
              }>
              <MaterialCommunityIcons
                name="play-circle"
                size={22}
                color="#fff"
              />
              <Text style={styles.actionText}>Start Route</Text>
            </TouchableOpacity>
          </View>

          {/* Next Pickup */}
          <Text style={styles.sectionTitle}>Next Pickup</Text>
          <View style={styles.nextCard}>
            <View style={styles.nextBadge}>
              <FontAwesome6
                name="truck"
                size={20}
                color="#04432c"
              />
            </View>

            <View style={styles.nextBody}>
              <Text style={styles.nextName}>{nextPickup.name}</Text>
              <Text style={styles.nextAddress}>{nextPickup.address}</Text>
              <Text style={styles.nextMeta}>
                {nextPickup.time} • {nextPickup.items}
              </Text>

              <View style={styles.nextActions}>
                <TouchableOpacity
                  style={[styles.smallBtn, styles.smallBtnOutline]}
                  onPress={() =>
                    router.push(`/(tabs)/(collector)/request/${nextPickup.id}`)
                  }>
                  <Text style={styles.smallBtnTextOutline}>Details</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.smallBtn,
                    styles.smallBtnPrimary,
                    { backgroundColor: '#085a3c' },
                  ]}
                  onPress={() =>
                    router.push(
                      `/(tabs)/(collector)/location?pickupId=${nextPickup.id}`
                    )
                  }>
                  <Text style={styles.smallBtnTextPrimary}>Navigate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Recent Activity */}
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {recent.map((a) => (
              <View
                key={a.id}
                style={styles.activityRow}>
                <View style={styles.activityIcon}>
                  <MaterialCommunityIcons
                    name="package-variant-closed"
                    size={20}
                    color="#04432c"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.activityTitle}>{a.title}</Text>
                  <Text style={styles.activitySubtitle}>{a.subtitle}</Text>
                </View>
                <Text style={styles.activityTime}>{a.time}</Text>
              </View>
            ))}
          </View>

          <View style={{ height: 32 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#04432c' },

  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSub: { color: '#a3d9b3', fontSize: 12 },
  headerName: { color: '#fff', fontSize: 18, fontWeight: '700' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconButton: {
    padding: 8,
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
  },
  avatar: { width: 40, height: 40, borderRadius: 10 },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },

  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  metricCard: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 16,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  metricLabel: {
    color: '#b8e0c6',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
    letterSpacing: 0.3,
  },

  metricValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
    textAlign: 'center',
  },

  metricSmall: {
    color: '#b8e0c6',
    fontSize: 11,
    marginTop: 2,
    opacity: 0.8,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 10,
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionBtn: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: { color: '#b8e0c6', marginTop: 6, fontWeight: '700' },

  nextCard: {
    flexDirection: 'row',
    backgroundColor: '#062a22',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    alignItems: 'center',
  },
  nextBadge: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  nextBody: { flex: 1 },
  nextName: { color: '#fff', fontSize: 16, fontWeight: '700' },
  nextAddress: { color: '#9fd7b3', fontSize: 13, marginTop: 4 },
  nextMeta: { color: '#9fd7b3', fontSize: 12, marginTop: 6 },

  nextActions: { flexDirection: 'row', marginTop: 10 },
  smallBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  smallBtnPrimary: { backgroundColor: '#1db954' },
  smallBtnTextPrimary: { color: '#b8e0c6', fontWeight: '700' },
  smallBtnOutline: {
    borderWidth: 1,
    borderColor: '#9fd7b3',
    backgroundColor: 'transparent',
  },
  smallBtnTextOutline: { color: '#9fd7b3', fontWeight: '700' },

  activityList: { marginTop: 6 },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    borderBottomWidth: 1,
  },
  activityIcon: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityTitle: { color: '#fff', fontWeight: '700' },
  activitySubtitle: { color: '#9fd7b3', marginTop: 3, fontSize: 13 },
  activityTime: { color: '#9fd7b3', fontWeight: '600', fontSize: 12 },
});
