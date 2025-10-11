import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome6,
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CollectorDashboard() {
  const router = useRouter();

  // TODO: replace with real data from your backend
  const metrics = {
    pending: 15,
    completed: 1120,
    earnings: '₦45,200',
  };

  const nextPickup = {
    id: 'p-123',
    name: 'Aisha Bello',
    address: 'Garki II, Plot 24',
    time: 'Today, 2:00 PM',
    items: 'PET bottles (5 bags)',
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
            <Text style={styles.headerTitle}>Welcome back,</Text>
            <Text style={styles.headerName}>Jika Mana</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/(collector)/notifications')}
              accessibilityLabel="Notifications"
              style={styles.iconButton}>
              <FontAwesome6
                name="bell"
                size={20}
                color="#ddd"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                router.push('/(tabs)/(collector)/collectorProfile')
              }
              accessibilityLabel="Open profile">
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
            <View style={[styles.metricCard, styles.metricCardLeft]}>
              <Text style={styles.metricLabel}>Pending</Text>
              <Text style={styles.metricValue}>{metrics.pending}</Text>
              <Text style={styles.metricSmall}>Priority</Text>
            </View>

            <View style={[styles.metricCard, styles.metricCardMiddle]}>
              <Text style={styles.metricLabel}>Completed</Text>
              <Text style={styles.metricValue}>{metrics.completed}</Text>
              <Text style={styles.metricSmall}>This month</Text>
            </View>

            <View style={[styles.metricCard, styles.metricCardRight]}>
              <Text style={styles.metricLabel}>Earnings</Text>
              <Text style={styles.metricValue}>{metrics.earnings}</Text>
              <Text style={styles.metricSmall}>Balance</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push('/(tabs)/(collector)/request')}>
              <MaterialCommunityIcons
                name="format-list-bulleted"
                size={22}
                color="#fff"
              />
              <Text style={styles.actionText}>Requests</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push('/(tabs)/(collector)/map')}>
              <Ionicons
                name="location"
                size={22}
                color="#fff"
              />
              <Text style={styles.actionText}>Map</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
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
            <View style={styles.nextLeft}>
              <View style={styles.nextBadge}>
                <FontAwesome6
                  name="truck"
                  size={20}
                  color="#04432c"
                />
              </View>
            </View>

            <View style={styles.nextBody}>
              <Text style={styles.nextName}>{nextPickup.name}</Text>
              <Text
                style={styles.nextAddress}
                numberOfLines={2}>
                {nextPickup.address}
              </Text>
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
                  style={[styles.smallBtn, styles.smallBtnPrimary]}
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
  headerTitle: { color: '#ddd', fontSize: 12 },
  headerName: { color: '#fff', fontSize: 18, fontWeight: '700' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { padding: 8, marginRight: 8 },
  avatar: { width: 40, height: 40, borderRadius: 8 },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },

  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    backgroundColor: '#062a22',
    alignItems: 'center',
  },
  metricCardLeft: {
    /* left */
  },
  metricCardMiddle: {
    /* center */
  },
  metricCardRight: {
    /* right */
  },

  metricLabel: { color: '#9fd7b3', fontSize: 12, fontWeight: '600' },
  metricValue: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 6 },
  metricSmall: { color: '#9fd7b3', fontSize: 12, marginTop: 4 },

  sectionTitle: {
    color: '#ddd',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 8,
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionBtn: {
    backgroundColor: '#0f7f0f',
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionText: { color: '#fff', marginTop: 6, fontWeight: '700' },

  nextCard: {
    flexDirection: 'row',
    backgroundColor: '#062a22',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  nextLeft: { marginRight: 12 },
  nextBadge: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
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
  smallBtnPrimary: { backgroundColor: '#0f7f0f' },
  smallBtnTextPrimary: { color: '#fff', fontWeight: '700' },
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
    paddingVertical: 2,
    borderBottomColor: 'rgba(255,255,255,0.04)',
    borderBottomWidth: 1,
  },
  activityIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityTitle: { color: '#fff', fontWeight: '700' },
  activitySubtitle: { color: '#9fd7b3', marginTop: 4 },
  activityTime: { color: '#9fd7b3', fontWeight: '700' },
});
