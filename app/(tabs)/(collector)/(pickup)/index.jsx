import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Pickup() {
  const router = useRouter();

  const pickupRequests = [
    { id: "#12345", address: "Opposite GUO, Eleme", points: 200 },
    { id: "#67890", address: "Opposite GIGM, Oyigbo", points: 150 },
    { id: "#24680", address: "Opposite RTC, Artilley", points: 250 },
    { id: "#13579", address: "Opposite KST, Mini-Okoro", points: 180 },
    {
      id: "#123453",
      address: "Opposite Chisco, Iwofe",
      points: 200,
    },
  ];

  const handlePress = (id) => {
    // Implement navigation or other logic here
    Alert.alert(`Tapped on request ${id}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#04432c" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuIcon}>
            <Ionicons name="menu" size={24} color="#ddd" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pickup Request</Text>
          <TouchableOpacity
            // onPress={() => navigation.goBack()}
            style={styles.mapIcon}
          >
            <Ionicons name="map-outline" size={24} color="#ddd" />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.filterContainer}>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Date</Text>
              <AntDesign
                name="down"
                size={12}
                color="#ddd"
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Accepted</Text>
              <AntDesign
                name="down"
                size={12}
                color="#ddd"
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Rejected</Text>
              <AntDesign
                name="down"
                size={12}
                color="#ddd"
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollContent}
          >
            <View style={styles.listContainer}>
              {pickupRequests.map((request) => (
                <TouchableOpacity
                  key={request.id}
                  style={styles.requestItem}
                  onPress={() => handlePress(request.id)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 12,
                      flex: 0.7,
                    }}
                  >
                    <FontAwesome5 name="recycle" size={24} color="#ddd" />
                    <View>
                      <Text style={styles.requestTitle}>Pickup Request</Text>
                      <Text style={styles.requestAddress}>
                        {request.address}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#ddd",
                      paddingHorizontal: 20,
                      borderRadius: 50,
                      alignItems: "center",
                      paddingVertical: 10,
                      marginVertical: 20,
                    }}
                  >
                    <Text
                      style={styles.buttonText}
                      onPress={() =>
                        router.push("/(tabs)/(collector)/(pickup)/request")
                      }
                    >
                      Details
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "#ddd",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  menuIcon: {
    position: "absolute",
    left: 20,
  },
  mapIcon: {
    position: "absolute",
    right: 20,
  },
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
    marginBottom: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterText: {
    color: "#ddd",
    fontSize: 14,
    marginRight: 5,
  },
  dropdownIcon: {
    opacity: 0.8,
  },
  scrollContent: {
    flex: 1,
  },
  listContainer: {},
  requestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  requestTitle: {
    color: "#ddd",
    fontSize: 16,
    fontWeight: "bold",
  },
  requestAddress: {
    fontSize: 14,
    color: "#0f7f0f",
  },
});
