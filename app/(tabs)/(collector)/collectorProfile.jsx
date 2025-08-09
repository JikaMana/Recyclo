import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CollectorProfile() {
  const activities = [
    {
      id: "1",
      points: 500,
      type: "Recycling Pickup",
      time: "2 days ago",
      isPositive: true,
    },
    {
      id: "2",
      points: 750,
      type: "Recycling Pickup",
      time: "1 week ago",
      isPositive: true,
    },
    {
      id: "3",
      points: -1000,
      type: "Cash Redemption",
      time: "2 weeks ago",
      isPositive: false,
    },
    {
      id: "4",
      points: 1200,
      type: "Recycling Pickup",
      time: "1 month ago",
      isPositive: true,
    },
    {
      id: "5",
      points: -1300,
      type: "Cash Redemption",
      time: "2 months ago",
      isPositive: false,
    },
    {
      id: "6",
      points: 750,
      type: "Recycling Pickup",
      time: "1 week ago",
      isPositive: true,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.activityItem}>
      <View>
        <Text
          style={[
            styles.points,
            item.isPositive ? styles.positivePoints : styles.negativePoints,
          ]}
        >
          {item.isPositive ? `+${item.points}` : item.points} Points
        </Text>
        <Text style={styles.activityType}>{item.type}</Text>
      </View>
      <Text
        style={[
          styles.activityTime,
          item.isPositive ? styles.positiveTime : styles.negativeTime,
        ]}
      >
        {item.time}
      </Text>
    </View>
  );

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
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <View style={styles.profilePhotoContainer}>
              <Image
                source={require("../../../assets/images/icon.png")}
                style={styles.profilePhoto}
              />
            </View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                lineHeight: 28,
                color: "#ddd",
                marginTop: 10,
              }}
            >
              Trans Amadi Center
            </Text>
            <Text style={{ fontSize: 14, marginTop: 2, color: "#0f7f0f" }}>
              350,500 points
            </Text>
            <Text style={{ fontSize: 14, lineHeight: 14, color: "#0f7f0f" }}>
              Member since 2025
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.subHeaderText}>Redeem Points</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#0f7f0f",
                  paddingHorizontal: 20,
                  borderRadius: 50,
                  alignItems: "center",
                  paddingVertical: 10,
                  marginVertical: 20,
                }}
              >
                <Text>Convert to Cash</Text>
              </TouchableOpacity>
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
                <Text>Convert to Airtime</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.subHeaderText}>Transaction History</Text>
            <FlatList
              data={activities}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
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
  leftArrow: {
    position: "absolute",
    left: 20,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  profilePhotoContainer: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#ddd",
  },
  profilePhoto: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  subHeaderText: {
    color: "#ddd",
    lineHeight: 23,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  points: {
    fontSize: 16,
    fontWeight: "bold",
  },
  positivePoints: {
    color: "#0f7f0f", // Green for positive points
  },
  negativePoints: {
    color: "#fc0", // A shade of red for negative points
  },
  activityType: {
    fontSize: 14,
    color: "#ddd",
    marginTop: 2,
  },
  activityTime: {
    fontSize: 14,
  },
  positiveTime: {
    color: "#0f7f0f",
  },
  negativeTime: {
    color: "#fc0",
  },
  separator: {
    height: 1,
    backgroundColor: "#333",
  },
});
