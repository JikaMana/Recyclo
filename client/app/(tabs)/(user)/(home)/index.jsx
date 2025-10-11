import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const router = useRouter();

  // sample placeholders (replace with API data later)
  const centers = [
    {
      id: '1',
      name: 'Amadi Recycling Centre - Kuje',
      hours: 'Open 8AM - 5PM',
      image: require('../../../../assets/images/collectors/kuje-collector.png'),
    },
    {
      id: '2',
      name: 'Oyigbo Recycling Centre',
      hours: 'Open 9AM - 5PM',
      image: require('../../../../assets/images/collectors/gwagwalada-collector.png'),
    },
  ];

  const recent = [
    {
      id: 'r1',
      title: 'Pickup Scheduled',
      subtitle: 'Today, 2PM - 4PM',
      icon: 'truck',
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
            <Text style={styles.greeting}>Hello, Jika</Text>
            <Text style={styles.subtitle}>Save waste • Earn rewards</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/(user)/(home)/notification')}
              style={styles.iconButton}>
              <FontAwesome6
                name="bell"
                size={20}
                color="#ddd"
              />
            </TouchableOpacity>
            <Image
              source={require('../../../../assets/images/icon.jpg')}
              style={styles.avatar}
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Points & Schedule */}
          <View style={styles.topRow}>
            <View style={styles.pointsCard}>
              <Text style={styles.pointsLabel}>Trash for Cash</Text>
              <Text style={styles.pointsValue}>12,500 pts</Text>
              <Text style={styles.pointsSub}>₦1,250 available</Text>
            </View>

            <View style={styles.scheduleCard}>
              <Text style={styles.scheduleTitle}>Schedule a Pickup</Text>
              <Text style={styles.scheduleSub}>We pick from your door</Text>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.push('/pickup')}>
                <Text style={styles.primaryButtonText}>Schedule</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Collectors / Centers */}
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={styles.sectionTitle}>Nearby Centers</Text>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/(user)/(home)/centers')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.allCentersButton}>All Centers</Text>
                <FontAwesome6
                  name="arrow-right"
                  size={14}
                  color="#0f7f0f"
                  style={{ marginLeft: 6 }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.grid}>
            {centers.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={styles.centerCard}
                onPress={() => router.push('/(tabs)/(user)/center-details')}>
                <Image
                  source={c.image}
                  style={styles.centerImage}
                />
                <View style={styles.centerInfo}>
                  <Text
                    numberOfLines={2}
                    style={styles.centerName}>
                    {c.name}
                  </Text>
                  <Text style={styles.centerHours}>{c.hours}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {/* Learn & Earn */}
          <Text style={styles.sectionTitle}>Learn & Earn</Text>
          <TouchableOpacity
            style={styles.learnCard}
            onPress={() => router.push('/(tabs)/(user)/(home)/learn')}>
            <View style={{ flex: 1 }}>
              <Text style={styles.learnTitle}>How to sort recyclables</Text>
              <Text style={styles.learnSub}>
                Simple tips to increase your earnings and reduce contamination.
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.allCentersButton}>Learn more</Text>
                <FontAwesome6
                  name="arrow-right"
                  size={14}
                  color="#0f7f0f"
                  style={{ marginLeft: 6 }}
                />
              </View>
            </View>
            <Image
              source={require('../../../../assets/images/learn-how-to-sort.png')}
              style={styles.learnImage}
            />
          </TouchableOpacity>
          {/* Recent Activities */}
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {recent.map((a) => (
              <View
                key={a.id}
                style={styles.activityRow}>
                <View style={styles.activityIcon}>
                  <FontAwesome6
                    name={a.icon}
                    size={20}
                    color="#04432c"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.activityTitle}>{a.title}</Text>
                  <Text style={styles.activitySubtitle}>{a.subtitle}</Text>
                </View>
                <Text style={styles.activityStatus}>Scheduled</Text>
              </View>
            ))}
          </View>
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#04432c' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  greeting: { color: '#fff', fontSize: 18, fontWeight: '700' },
  subtitle: { color: '#ddd', fontSize: 12, marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { padding: 8, marginRight: 10 },
  avatar: { width: 38, height: 38, borderRadius: 10 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  topRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  pointsCard: {
    flex: 1,
    backgroundColor: '#072e21',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    padding: 12,
    justifyContent: 'center',
  },
  pointsLabel: { color: '#9fd7b3', fontSize: 12 },
  pointsValue: { color: '#fff', fontSize: 18, fontWeight: '700', marginTop: 6 },
  pointsSub: { color: '#9fd7b3', fontSize: 12, marginTop: 4 },

  scheduleCard: {
    width: 150,
    backgroundColor: '#072e21',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    padding: 12,
    justifyContent: 'space-between',
  },
  scheduleTitle: { color: '#fff', fontWeight: '700', fontSize: 14 },
  scheduleSub: { color: '#9fd7b3', fontSize: 12, marginBottom: 10 },

  primaryButton: {
    backgroundColor: '#0f7f0f',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontWeight: '700' },

  sectionTitle: {
    color: '#ddd',
    fontSize: 16,
    fontWeight: '700',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  centerCard: {
    width: '48%',
    backgroundColor: '#062a22',
    borderRadius: 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,

    overflow: 'hidden',
    marginBottom: 12,
  },
  centerImage: { width: '100%', height: 100, resizeMode: 'cover' },
  centerInfo: { padding: 8 },
  centerName: { color: '#fff', fontWeight: '700', fontSize: 13 },
  centerHours: { color: '#9fd7b3', fontSize: 12, marginTop: 4 },

  learnCard: {
    backgroundColor: '#062a22',
    borderRadius: 6,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  learnTitle: { color: '#fff', fontSize: 14, fontWeight: '700' },
  learnSub: { color: '#ddd', fontSize: 12, marginTop: 6, marginBottom: 6 },
  learnAction: { color: '#0f7f0f', fontWeight: '700' },
  learnImage: { width: 90, height: 70, borderRadius: 8, marginLeft: 12 },

  activityList: { marginBottom: 16 },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(255,255,255,0.04)',
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  activityIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityTitle: { color: '#fff', fontSize: 14, fontWeight: '700' },
  activitySubtitle: { color: '#ddd', fontSize: 12, marginTop: 2 },
  activityStatus: { color: '#9fd7b3', fontSize: 12, fontWeight: '700' },
  allCentersButton: { color: '#0f7f0f', fontWeight: '700' },
});
