import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const router = useRouter();

  const metrics = [
    { title: "Total Pickups", value: "1,250" },
    { title: "Pending Pickups", value: "150" },
    { title: "Completed Pickups", value: "1,100" },
  ];

  const activities = [
    {
      name: "Aisha Bello",
      action: "Pickup Request",
      icon: "cube-outline",
      color: "#0f7f0f",
    },
    {
      name: "Chukwudi Okoro",
      action: "New User",
      icon: "person-outline",
      color: "#1e90ff",
    },
    {
      name: "Fatima Hassan",
      action: "Pickup Completed",
      icon: "checkmark-circle-outline",
      color: "#0f7f0f",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#04432c" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuIcon}>
            <Ionicons name="menu" size={24} color="#ddd" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dashboard</Text>
        </View>
        <View style={styles.mainContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollContent}
          >
            <View style={styles.tabs}>
              {["Overview", "Pickups"].map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: "#ddd",
                    paddingBottom: 5,
                  }}
                >
                  <Text
                    style={[styles.tabText, index === 0 && styles.activeTab]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.subHeaderText}>Key Metric</Text>
            <View style={styles.metricsGrid}>
              {metrics.map((item, index) => (
                <View
                  key={index}
                  style={[styles.metricCard, index === 2 && { width: "100%" }]}
                >
                  <Text style={styles.metricValue}>{item.value}</Text>
                  <Text style={styles.metricTitle}>{item.title}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.subHeaderText}>Recent Activity</Text>

            <View style={styles.detailsContent}>
              {activities.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 16,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#ddd",
                      padding: 8,
                      borderRadius: 4,
                    }}
                  >
                    <MaterialCommunityIcons
                      size={28}
                      color="#333"
                      name="package-variant"
                    />
                  </View>
                  <View>
                    <Text style={styles.userName}>Jika Mana</Text>
                    <Text style={styles.activity}>Pickup Completed</Text>
                  </View>
                </View>
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
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  subHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  subHeaderText: {
    color: "#ddd",
    lineHeight: 23,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  tabs: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tabText: { fontSize: 16, color: "#888" },
  activeTab: { color: "#0f7f0f", fontWeight: "bold" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  metricsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  metricCard: {
    width: "48%",
    backgroundColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  metricTitle: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  detailsContent: {
    gap: 10,
  },
  userName: {
    color: "#ddd",
    fontSize: 16,
    fontWeight: "bold",
  },
  activity: {
    fontSize: 14,
    color: "#0f7f0f",
  },
  activityName: { fontWeight: "bold", fontSize: 16 },
  quickActionBtn: {
    flex: 1,
    backgroundColor: "#0f7f0f",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  quickActionText: { color: "#fff", fontWeight: "bold" },
});
