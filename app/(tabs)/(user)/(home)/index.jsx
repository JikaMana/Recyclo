import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#04432c" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}> Recyclo</Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/(user)/(home)/notification")}
            style={styles.bell}
          >
            <FontAwesome6 name="bell" size={24} color="#ddd" />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContent}
        >
          <View style={{ marginVertical: 10, paddingHorizontal: 20 }}>
            <View style={styles.subHeader}>
              <Text style={styles.subHeaderText}>Schedule a Pickup</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/pickup")}
              >
                <Text style={styles.buttonText}>Schedule</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require("../../../../assets/images/pickup-banner.png")}
              style={{ borderRadius: 12 }}
            />

            <View style={{ marginTop: 30 }}>
              <Text style={styles.subHeaderText}>Trash for Cash Points</Text>
              <View style={styles.centerContainer}>
                <View style={styles.centerBox}>
                  <Image
                    source={require("../../../../assets/images/collectors/kuje-collector.png")}
                    style={styles.centerImage}
                  />
                  <View style={{ marginLeft: 5 }}>
                    <Text style={styles.centerName}>Amadi Recycling </Text>
                    <Text
                      style={{ fontSize: 12, lineHeight: 12, color: "#ddd" }}
                    >
                      Open 8AM - 5PM
                    </Text>
                  </View>
                </View>
                <View style={styles.centerBox}>
                  <Image
                    source={require("../../../../assets/images/collectors/gwagwalada-collector.png")}
                    style={styles.centerImage}
                  />
                  <View style={{ marginLeft: 5 }}>
                    <Text style={styles.centerName}>Oyigbo Recycling </Text>
                    <Text
                      style={{ fontSize: 12, lineHeight: 12, color: "#ddd" }}
                    >
                      Open 9AM - 5PM
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={styles.subHeaderText}>Learn & Earn</Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ width: "45%" }}>
                  <Text
                    style={{
                      fontSize: 14,
                      lineHeight: 21,
                      fontWeight: "500",
                      marginBottom: 10,
                      color: "#ddd",
                    }}
                  >
                    Learn how to properly sort your recyclables.
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push("/(tabs)/(user)/(home)/learn")}
                  >
                    <Text style={styles.buttonText}>Learn More</Text>
                  </TouchableOpacity>
                </View>
                <Image
                  source={require("../../../../assets/images/learn-how-to-sort.png")}
                  style={{ width: "50%", borderRadius: 12 }}
                />
              </View>
            </View>
            <View style={{ marginVertical: 20 }}>
              <Text style={styles.subHeaderText}>Recent Activities</Text>
              <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <View
                    style={{
                      backgroundColor: "#ddd",
                      width: 48,
                      height: 48,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 8,
                    }}
                  >
                    <FontAwesome6 size={24} name="truck" color="#04432c" />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: "#ddd",
                      }}
                    >
                      Today, 2PM - 4PM
                    </Text>
                    <Text style={{ color: "#ddd", fontSize: 14 }}>
                      Pickup Scheduled
                    </Text>
                  </View>
                </View>
              </View>
            </View>
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
  bell: {
    position: "absolute",
    right: 20,
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
  },
  button: {
    backgroundColor: "#0f7f0f",
    borderRadius: 16,
    width: "max-content",
    height: 32,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  centerContainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  centerBox: {
    width: "48%",
    marginBottom: 20,
  },
  centerImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    resizeMode: "cover",
  },

  centerName: {
    color: "#ddd",
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "600",
  },
});
