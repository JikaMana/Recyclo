import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function map() {
  const pendingPickups = [
    { id: 1, lat: 9.056, lng: 7.495, title: "Pickup #1" },
    { id: 2, lat: 9.058, lng: 7.5, title: "Pickup #2" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#04432c" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <View style={{ flex: 1 }}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 9.056,
              longitude: 7.495,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation
            showsMyLocationButton
          >
            {pendingPickups.map((pickup) => (
              <Marker
                key={pickup.id}
                coordinate={{
                  latitude: pickup.lat,
                  longitude: pickup.lng,
                }}
                title={pickup.title}
                description="Pending pickup location"
              />
            ))}
          </MapView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1, width: "100%", height: "100%" },
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
