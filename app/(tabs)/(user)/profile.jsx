import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserProfile() {
  const router = useRouter();

  const profileOptions = [
    {
      id: "1",
      title: "Edit Profile",
      icon: "person-outline",
      action: () => console.log("Navigate to Edit Profile"),
    },
    {
      id: "2",
      title: "Notifications",
      icon: "notifications-outline",
      action: () => router.push("/(tabs)/(user)/(home)/notification"),
    },
    {
      id: "3",
      title: "Change Password",
      icon: "lock-closed-outline",
      action: () => console.log("Navigate to Change Password"),
    },
    {
      id: "4",
      title: "Help & Support",
      icon: "help-circle-outline",
      action: () => console.log("Navigate to Help & Support"),
    },
    {
      id: "5",
      title: "Privacy Policy",
      icon: "document-text-outline",
      action: () => console.log("Navigate to Privacy Policy"),
    },
    {
      id: "6",
      title: "Log Out",
      icon: "log-out-outline",
      action: () => console.log("Handle Log Out"),
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={item.action} style={styles.optionItem}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name={item.icon} size={24} color="#ddd" />
        <Text style={styles.optionTitle}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="#888" />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#04432c" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <TouchableOpacity
            // onPress={() => navigation.goBack()}
            style={styles.leftArrow}
          >
            <Ionicons name="arrow-back" size={24} color="#ddd" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>
        <View style={styles.mainContainer}>
          <FlatList
            data={profileOptions}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <View style={{ alignItems: "center", marginBottom: 20 }}>
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
                  Jika Mana
                </Text>
                <Text style={{ fontSize: 14, color: "#0f7f0f", marginTop: 4 }}>
                  User
                </Text>
              </View>
            )}
          />
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
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ddd",
    marginLeft: 15,
  },
  separator: {
    height: 1,
    backgroundColor: "#333",
  },
});
