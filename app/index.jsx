import { Link } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, height: Dimensions.get("screen").height / 2.31 }}>
        <View style={styles.banner}>
          <Text style={{ fontSize: 36, color: "#fff" }}>Recyclo</Text>
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.bannerImage}
          />
        </View>
        <View style={styles.textsContainer}>
          <Text style={styles.headerText}>Turning Waste into Value</Text>
          <Text style={styles.introText}>
            Join us in making Nigeria greener. Request pickups, Earn recycling
            points.
          </Text>
        </View>
      </View>
      <Link href="register" style={styles.button}>
        <Text style={styles.buttonText}> Get Started</Text>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    // backgroundColor: "#013220",
    backgroundColor: "#04432c",
  },
  banner: {
    height: "40%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: "#0f7f0f",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImage: {
    width: 120,
    height: 120,
    position: "absolute",
    bottom: -55,
    zIndex: 100,
    backgroundColor: "#0f7f0f",
    borderBottomLeftRadius: 75,
    borderBottomRightRadius: 75,
    resizeMode: "contain",
  },
  textsContainer: {
    marginTop: 100,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  introText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 24,
    color: "#fff",
  },
  button: {
    backgroundColor: "#0f7f0f",
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
});
