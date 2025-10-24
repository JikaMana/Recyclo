import { AntDesign, Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedTextInput from '../../../components/ThemedTextInput';
import { useState } from 'react';
import { usePickup } from '../../../contexts/PickupContext';

export default function History() {
  const { pickupRequests, isLoading } = usePickup();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredRequests =
    selectedFilter === 'All'
      ? pickupRequests
      : pickupRequests.filter(
          (item) => item.status.toLowerCase() === selectedFilter.toLowerCase()
        );

  const renderItem = ({ item }) => {
    const capitalizedStatus =
      item.status.charAt(0).toUpperCase() + item.status.slice(1);

    let statusStyle;
    if (item.status === 'completed') statusStyle = styles.completedStatus;
    else if (item.status === 'pending') statusStyle = styles.pendingStatus;
    else if (item.status === 'cancelled') statusStyle = styles.cancelledStatus;

    return (
      <TouchableOpacity
        key={item._id}
        style={styles.requestItem}
        onPress={() => console.log(`Tapped on request ${item._id}`)}>
        <View style={styles.requestContent}>
          <Text style={styles.requestTitle}>
            {item.selectedTypes?.join(', ') || 'No materials'}
          </Text>
          <Text style={styles.requestDate}>{formatDate(item.createdAt)}</Text>
          <Text style={styles.requestAddress}>{item.address}</Text>
        </View>
        <View style={styles.statusBadgeContainer}>
          <Text style={[styles.statusBadge, statusStyle]}>
            {capitalizedStatus}
          </Text>
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
            {['All', 'Completed', 'Pending'].map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.activeFilter,
                ]}>
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter && { color: '#fff' },
                  ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* List */}
        <View style={styles.listContainer}>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#1db954"
            />
          ) : pickupRequests.length === 0 ? (
            <Text style={{ color: '#ccc', textAlign: 'center', marginTop: 20 }}>
              No pickup requests found.
            </Text>
          ) : (
            <FlatList
              data={filteredRequests}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
            />
          )}
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
    color: '#eeeeee',
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
    borderColor: '#1db954',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
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
    maxWidth: '70%',
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
  requestAddress: {
    fontSize: 12,
    marginTop: 3,
    color: '#888',
    flexWrap: 'w',
  },
});
