import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../../contexts/AuthContext';

export default function CollectorProfile() {
  const router = useRouter();
  const { logout } = useAuth();

  const subscriptionDetails = {
    plan: 'Monthly',
    status: 'Active',
    activated: '10th Aug 2025',
    expires: '10th Oct 2025',
  };

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={['top', 'left', 'right']}>
        {/* HEADER */}
        <View style={styles.header}>
          {/* <TouchableOpacity style={styles.menuIcon}>
            <Ionicons
              name="menu"
              size={24}
              color="#E6E6E6"
            />
          </TouchableOpacity> */}
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        {/* MAIN CONTENT */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
          {/* PROFILE INFO */}
          <View style={styles.profileSection}>
            <Ionicons
              name="person-circle"
              size={100}
              color="#D1FADF"
            />
            <Text style={styles.name}>Jika Mana</Text>
            <Text style={styles.collectorId}>Collector ID: 08-G2H4V-2025</Text>

            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={logout}>
              <Ionicons
                name="log-out-outline"
                size={18}
                color="#fff"
              />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>

          {/* SUBSCRIPTION */}
          <Text style={styles.subHeaderText}>Subscription Details</Text>

          <View style={styles.detailsCard}>
            <DetailRow
              title="Plan"
              value={subscriptionDetails.plan}
            />
            <DetailRow
              title="Status"
              value={subscriptionDetails.status}
              valueColor="#1DB954"
            />
            <DetailRow
              title="Activated On"
              value={subscriptionDetails.activated}
            />
            <DetailRow
              title="Expires On"
              value={subscriptionDetails.expires}
              valueColor="#EF4444"
            />

            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => router.push('/subscription')}>
              <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const DetailRow = ({ title, value, valueColor = '#1F2937' }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailTitle}>{title}</Text>
    <Text style={[styles.detailValue, { color: valueColor }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04432C', // main theme background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
  },
  menuIcon: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    color: '#E6E6E6',
    fontSize: 20,
    fontWeight: '700',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E6E6E6',
    marginTop: 10,
  },
  collectorId: {
    fontSize: 14,
    color: '#86EFAC',
    marginTop: 4,
  },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: '#1DB954',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  subHeaderText: {
    color: '#E6E6E6',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  detailsCard: {
    backgroundColor: '#F8F8F5',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  detailTitle: {
    fontSize: 15,
    color: '#374151',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  paymentButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 24,
  },
  paymentButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
