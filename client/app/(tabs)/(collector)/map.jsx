import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { usePickup } from '../../../contexts/PickupContext';

export default function Map() {
  const mapRef = useRef(null);
  const { pickupRequests } = usePickup();

  const [pendingPickups, setPendingRequest] = useState([]);

  useEffect(() => {
    if (pickupRequests && pickupRequests.length > 0) {
      const pickup = pickupRequests.map((pickup) => pickup);
      setPendingRequest(pickup);
    }
  }, [pickupRequests]);

  const [initialRegion, setInitialRegion] = useState({
    latitude: 9.056,
    longitude: 7.495,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        // Ask permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission denied',
            'Location access is required to select location.'
          );
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const currentRegion = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        };
        setInitialRegion(currentRegion);

        mapRef.current?.animateToRegion(currentRegion, 1000);
      } catch (err) {
        console.log(err.message || 'Location Unavailable at the moment');
      }
    };
    requestLocationPermission();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#04432c' }}>
      <View
        style={{ flex: 1 }}
        edges={['top', 'left', 'right']}>
        <View style={{ flex: 1 }}>
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={initialRegion}
            showsUserLocation
            showsMyLocationButton>
            {pendingPickups.map((pickup) => {
              const eachPickup = pickup.location;
              return (
                <Marker
                  key={pickup._id}
                  coordinate={{
                    latitude: eachPickup.latitude,
                    longitude: eachPickup.longitude,
                  }}
                  title={pickup.title}
                  description="Pending pickup location"
                />
              );
            })}
          </MapView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1, width: '100%', height: '100%' },
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
