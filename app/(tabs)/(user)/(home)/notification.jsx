import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationCard from "../../../../components/NotificationCard";

export default function NotificationsPage() {
  const navigation = useNavigation();

  const notifications = [
    // Today's notifications
    {
      id: "1",
      section: "Today",
      iconName: "truck",
      iconColor: "#c5e8c1",
      title: "Pickup Scheduled",
      message:
        "Your pickup request for 2kg of plastic bottles has been scheduled for tomorrow.",
    },
    {
      id: "2",
      section: "Today",
      iconName: "gift",
      iconColor: "#e0c98f",
      title: "Promotional Offer",
      message:
        "Earn 500 points for every 1kg of sorted waste you recycle this month.",
    },

    // Yesterday's notifications
    {
      id: "3",
      section: "Yesterday",
      iconName: "megaphone-sharp",
      iconColor: "#e1e1e1",
      title: "News from Triple R",
      message:
        "Triple R Recycling is expanding its services to Gwagalada. Stay tuned for more",
    },
    {
      id: "4",
      section: "Yesterday",
      iconName: "documents",
      iconColor: "#c5e8c1",
      title: "App Update",
      message:
        "We've updated our privacy policy to better protect your data. Please review the",
    },
  ];

  const todayNotifications = notifications.filter(
    (item) => item.section === "Today"
  );
  const yesterdayNotifications = notifications.filter(
    (item) => item.section === "Yesterday"
  );
  const olderNotifications = notifications.filter(
    (item) => item.section !== "Today" || "Yesterday"
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
          <Text style={styles.headerTitle}> Notifications</Text>
        </View>
        <View style={styles.mainContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollViewContent}
          >
            <Text style={styles.sectionHeader}>Today</Text>
            {todayNotifications.map((item) => (
              <NotificationCard
                key={item.id}
                iconName={item.iconName}
                iconColor={item.iconColor}
                title={item.title}
                message={item.message}
              />
            ))}
            <Text style={styles.sectionHeader}>Yesterday</Text>
            {yesterdayNotifications.map((item) => (
              <NotificationCard
                key={item.id}
                iconName={item.iconName}
                iconColor={item.iconColor}
                title={item.title}
                message={item.message}
              />
            ))}
            <Text style={styles.sectionHeader}>Older</Text>
            {yesterdayNotifications.map((item) => (
              <NotificationCard
                key={item.id}
                iconName={item.iconName}
                iconColor={item.iconColor}
                title={item.title}
                message={item.message}
              />
            ))}
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
  leftArrow: {
    position: "absolute",
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ddd",
    marginBottom: 20,
  },
  mainContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
    paddingBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ddd",
    marginTop: 20,
  },
});
