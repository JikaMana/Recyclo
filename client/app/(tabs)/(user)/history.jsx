import { AntDesign, Ionicons } from '@expo/vector-icons';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedTextInput from '../../../components/ThemedTextInput';

export default function History() {
  const pickupRequests = [
    {
      id: '12345',
      materialType: 'Plastic Bottles',
      status: 'Completed',
      date: 'Oct 25, 2025',
    },
    {
      id: '67890',
      materialType: 'Cardboard Boxes',
      status: 'Pending',
      date: 'Oct 23, 2025',
    },
    {
      id: '24680',
      materialType: 'Aluminium Cans',
      status: 'Completed',
      date: 'Oct 20, 2025',
    },
    {
      id: '13579',
      materialType: 'Glass Bottles',
      status: 'Cancelled',
      date: 'Oct 18, 2025',
    },
    {
      id: '123453',
      materialType: 'Newspapers',
      status: 'Completed',
      date: 'Oct 15, 2025',
    },
    {
      id: '678903',
      materialType: 'Mixed Paper',
      status: 'Pending',
      date: 'Oct 12, 2025',
    },
  ];

  const renderItem = ({ item }) => {
    let statusStyle;
    if (item.status === 'Completed') statusStyle = styles.completedStatus;
    else if (item.status === 'Pending') statusStyle = styles.pendingStatus;
    else if (item.status === 'Cancelled') statusStyle = styles.cancelledStatus;

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.requestItem}
        onPress={() => console.log(`Tapped on request ${item.id}`)}>
        <View style={styles.requestContent}>
          <Text style={styles.requestTitle}>{item.materialType}</Text>
          <Text style={styles.requestDate}>{item.date}</Text>
        </View>
        <View style={styles.statusBadgeContainer}>
          <Text style={[styles.statusBadge, statusStyle]}>{item.status}</Text>
          <AntDesign
            name="right"
            size={16}
            color="#bbb"
            style={{ marginLeft: 10 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#04432c' }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={['top', 'left', 'right']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.leftArrow}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#ddd"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pickup History</Text>
        </View>

        {/* Search & Filters */}
        <View style={styles.mainContainer}>
          <View style={styles.searchContainer}>
            <ThemedTextInput
              placeholder="Search by date or status"
              style={styles.input}
            />
            <Ionicons
              name="search"
              size={20}
              color="#999"
              style={styles.searchIcon}
            />
          </View>

          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterButton, styles.activeFilter]}>
              <Text style={[styles.filterText, { color: '#fff' }]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Pending</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* List */}
        <View style={styles.listContainer}>
          <FlatList
            data={pickupRequests}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
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
    height: 45,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  leftArrow: {
    position: 'absolute',
    left: 20,
  },
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  searchContainer: {
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 15,
  },
  input: {
    borderRadius: 10,
    paddingLeft: 40,
    paddingHorizontal: 18,
    borderColor: '#0a6b46',
    borderWidth: 1.3,
    color: '#eee',
    backgroundColor: 'rgba(255,255,255,0.05)',
    fontSize: 14,
    paddingVertical: 10,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  filterButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1db954',
    backgroundColor: 'transparent',
  },
  activeFilter: {
    backgroundColor: '#1db954',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  filterText: {
    color: '#ddd',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 5,
  },
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  requestContent: {
    flexDirection: 'column',
  },
  requestTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  requestDate: {
    fontSize: 13,
    marginTop: 2,
    color: '#aaa',
  },
  statusBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    color: '#04432c',
  },
  completedStatus: {
    backgroundColor: '#1db954',
  },
  pendingStatus: {
    backgroundColor: '#f7c948',
  },
  cancelledStatus: {
    backgroundColor: '#f84f4f',
  },
});
