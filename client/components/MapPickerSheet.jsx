import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapPickerSheet = ({ sheetRef, onConfirm }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 7.6233, // Afe Babalola University
    longitude: 5.2233, // Ado-Ekiti
    latitudeDelta: 0.004,
    longitudeDelta: 0.004,
  });

  // Ask for location permission & center map
  useEffect(() => {
    try {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;
        const loc = await Location.getCurrentPositionAsync({});
        setInitialRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        });
      })();
    } catch (err) {
      console.log(err.message || 'Location Unavailable at the moment');
    }
  }, []);

  const snapPoints = useMemo(() => ['100%'], []);

  const handleMapPress = (e) => {
    const coord = e.nativeEvent.coordinate;
    setSelectedLocation(coord);
  };

  const handleConfirm = () => {
    if (selectedLocation && onConfirm) {
      onConfirm(selectedLocation);
    }
    sheetRef.current?.close();
  };

  const handleClose = () => sheetRef.current?.close();

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: '#186c4dff' }}
      handleIndicatorStyle={{ backgroundColor: '#1d5239ff' }}>
      <BottomSheetView
        style={{
          flex: 1,
          height: '100%',
        }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Select Pickup Location</Text>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons
              name="close"
              size={24}
              color="#ddd"
            />
          </TouchableOpacity>
        </View>

        {/* Map Section */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
            onPress={handleMapPress}>
            {selectedLocation && (
              <Marker
                coordinate={selectedLocation}
                pinColor="#0f7f0f"
              />
            )}
          </MapView>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          style={[
            styles.confirmButton,
            !selectedLocation && styles.confirmButtonDisabled,
          ]}
          onPress={handleConfirm}
          disabled={!selectedLocation}>
          <Text style={styles.confirmText}>
            {selectedLocation ? 'Confirm Location' : 'Tap on map to select'}
          </Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default MapPickerSheet;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    color: '#ddd',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  map: {
    flex: 1,
    borderRadius: 12,
  },
  confirmButton: {
    backgroundColor: '#0f7f0f',
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  confirmButtonDisabled: {
    backgroundColor: '#2a5c45',
    opacity: 0.6,
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
