// components/NotificationCard.jsx
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function NotificationCard({
  iconName,
  iconColor,
  title,
  message,
}) {
  // Determine the icon library based on the icon name
  const IconComponent =
    iconName === "truck" || iconName === "box" || iconName === "paper-plane"
      ? FontAwesome5
      : Ionicons;

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.iconBox, { backgroundColor: iconColor }]}>
        <IconComponent name={iconName} size={24} color="#04432c" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardMessage}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  iconBox: {
    padding: 10,
    borderRadius: 8,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ddd",
  },
  cardMessage: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 2,
    lineHeight: 20,
  },
});
