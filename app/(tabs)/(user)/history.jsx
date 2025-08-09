import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedTextInput from "../../../components/ThemedTextInput";

export default function history() {
  const pickupRequests = [
    { id: "#12345", status: "Completed", points: 200 },
    { id: "#67890", status: "Pending", points: 150 },
    { id: "#24680", status: "Completed", points: 250 },
    { id: "#13579", status: "Completed", points: 180 },
    { id: "#123453", status: "Completed", points: 200 },
    { id: "#678903", status: "Pending", points: 150 },
    { id: "#246803", status: "Completed", points: 250 },
    { id: "#135793", status: "Completed", points: 180 },
  ];

  const handlePress = (id) => {
    // Implement navigation or other logic here
    Alert.alert(`Tapped on request ${id}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#04432c" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.leftArrow}
          >
            <Ionicons name="arrow-back" size={24} color="#ddd" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pickup History</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.searchContainer}>
            <ThemedTextInput
              placeholder="Search by date or status"
              style={styles.input}
            />
            <Ionicons
              name="search"
              size={20}
              color="#888"
              style={styles.searchIcon}
            />
          </View>
          <View style={styles.filterContainer}>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>All</Text>
              <AntDesign
                name="down"
                size={12}
                color="#ddd"
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Completed</Text>
              <AntDesign
                name="down"
                size={12}
                color="#ddd"
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Pending</Text>
              <AntDesign
                name="down"
                size={12}
                color="#ddd"
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>
          </View>
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
                <View>
                  <Text style={styles.requestTitle}>
                    Pickup Request {request.id}
                  </Text>
                  <Text
                    style={[
                      styles.requestStatus,
                      request.status === "Completed"
                        ? styles.completedStatus
                        : styles.pendingStatus,
                    ]}
                  >
                    {request.status} · {request.points} points
                  </Text>
                </View>
                <AntDesign name="right" size={20} color="#ddd" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
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
  leftArrow: {
    position: "absolute",
    left: 20,
  },
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  searchContainer: {
    position: "relative",
    justifyContent: "center",
    marginBottom: 10,
  },
  input: {
    borderRadius: 8,
    paddingLeft: 40,
    paddingHorizontal: 18,
    borderColor: "#444",
    borderWidth: 1,
    color: "#ddd",
    fontSize: 14,
    paddingBlock: 10,
  },
  searchIcon: {
    position: "absolute",
    left: 10,
    top: 12,
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
    paddingHorizontal: 20,
  },
  listContainer: {
    // This container holds the list items
  },
  requestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  requestTitle: {
    color: "#ddd",
    fontSize: 16,
    fontWeight: "bold",
  },
  requestStatus: {
    fontSize: 14,
    marginTop: 2,
  },
  completedStatus: {
    color: "#0f7f0f", // Green color for completed status
  },
  pendingStatus: {
    color: "#ffd700", // Yellow/gold color for pending status
  },
});
