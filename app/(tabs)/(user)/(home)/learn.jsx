import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const learningContent = [
  {
    id: "plastics",
    title: "Plastics",
    content: [
      "• Rinse out food and liquids from bottles and containers.",
      "• Remove lids and caps.",
      "• Look for the recycling symbol with a number (1, 2, 5, etc.).",
    ],
  },
  {
    id: "paper",
    title: "Paper & Cardboard",
    content: [
      "• Flatten all cardboard boxes to save space.",
      "• Keep paper and cardboard dry and clean.",
      "• Remove any plastic tape, labels, or staples if possible.",
    ],
  },
  {
    id: "glass",
    title: "Glass",
    content: [
      "• Rinse glass bottles and jars well.",
      "• You can leave the labels on, but remove metal lids and caps.",
      "• Never recycle broken glass to prevent injury.",
    ],
  },
  {
    id: "metals",
    title: "Metals",
    content: [
      "• Rinse out any food residue from cans.",
      "• Flatten cans to save space.",
      "• Foil trays and wrappers should be cleaned.",
    ],
  },
];

export default function LearnAndEarn() {
  const navigation = useNavigation();
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#ddd" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Learn & Earn</Text>
        </View>

        <ScrollView style={styles.mainContent}>
          <Text style={styles.subHeaderText}>
            Learn how to properly sort your recyclables
          </Text>
          <Text style={styles.introText}>
            Sorting correctly helps the recycling process and ensures that more
            materials can be reused. Follow these simple steps for each type of
            recyclable.
          </Text>

          {learningContent.map((section) => (
            <View key={section.id}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection(section.id)}
              >
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Ionicons
                  name={
                    expandedSection === section.id
                      ? "chevron-up-circle-outline"
                      : "chevron-down-circle-outline"
                  }
                  size={24}
                  color="#0f7f0f"
                />
              </TouchableOpacity>
              {expandedSection === section.id && (
                <View style={styles.sectionContent}>
                  {section.content.map((bullet, index) => (
                    <Text key={index} style={styles.bulletText}>
                      {bullet}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04432c",
  },
  safeArea: {
    flex: 1,
  },
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
  backButton: {
    position: "absolute",
    left: 20,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  subHeaderText: {
    color: "#ddd",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  introText: {
    color: "#ddd",
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionContent: {
    backgroundColor: "#ddd",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  bulletText: {
    color: "#333",
    fontSize: 14,
    marginBottom: 8,
  },
});
