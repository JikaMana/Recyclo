import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function request() {
  const navigation = useNavigation();

  const handleAccept = () => {
    // Handle the accept logic here
    console.log("Accepted!");
  };

  const handleReject = () => {
    // Handle the reject logic here
    console.log("Rejected!");
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContent}
        >
          <View style={styles.mainContainer}>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.subHeaderText}>Request Details</Text>
            </View>
            <View style={styles.detailsContent}>
              <View
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
                  <AntDesign name="enviromento" size={24} color="#333" />
                </View>
                <View>
                  <Text style={styles.requestTitle}>Address</Text>
                  <Text style={styles.requestAddress}>
                    Opposite KST, Mini-Okoro
                  </Text>
                </View>
              </View>
              <View
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
                  <Ionicons name="call" size={24} color="#333" />
                </View>
                <View>
                  <Text style={styles.requestTitle}>Contact</Text>
                  <Text style={styles.requestAddress}>+234 9012345678</Text>
                </View>
              </View>
              <View
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
                  <FontAwesome5 name="recycle" size={24} color="#333" />
                </View>
                <View>
                  <Text style={styles.requestTitle}>Waste Type</Text>
                  <Text style={styles.requestAddress}>
                    Plastic bottles, paper, cardboard
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.subHeaderText}>Waste Photos</Text>
            </View>
            <View style={styles.wastePhotosContent}>
              <Image
                source={require("../../../../assets/images/plastic-bottle.png")}
                style={styles.wastePhotos}
              />
              <Image
                source={require("../../../../assets/images/plastic-bottle.png")}
                style={styles.wastePhotos}
              />
              <Image
                source={require("../../../../assets/images/plastic-bottle.png")}
                style={styles.wastePhotos}
              />
              <Image
                source={require("../../../../assets/images/plastic-bottle.png")}
                style={styles.wastePhotos}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: "red",
              },
            ]}
          >
            <Text style={{ color: "#fff" }}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: "#0f7f0f",
              },
            ]}
          >
            <Text style={{ color: "#fff" }}>Accept</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    marginTop: 10,
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  subHeaderText: {
    color: "#ddd",
    lineHeight: 23,
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsContent: {
    marginVertical: 20,
    gap: 10,
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
  wastePhotosContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  wastePhotos: {
    width: "48%",
    resizeMode: "contain",
  },
  actionButtonContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginTop: "auto",
  },
  actionButton: {
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
    paddingVertical: 10,
  },
});
