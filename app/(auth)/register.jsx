import { Link } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import ThemedTextInput from "../../components/ThemedTextInput";

export default function Register() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#F6F8F7" }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Create an Account</Text>
        <ThemedTextInput
          placeholder="Full Name"
          label="Name"
          mode="outlined"
          style={styles.input}
        />
        <ThemedTextInput
          placeholder="Enter your email"
          autoCapitalize="none"
          label="Email"
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
        />
        <ThemedTextInput
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          label="Phone"
          mode="outlined"
          style={styles.input}
        />
        <ThemedTextInput
          placeholder="Password"
          label="Password"
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
        <ThemedTextInput
          placeholder="Referral Code (Optional)"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
      <Link href="login" style={styles.login}>
        <Text>Already have an account? </Text>
        <Text>Sign In</Text>
      </Link>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#F6F8F7",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#0f7f0f",
  },
  input: {
    marginBottom: 18,
    backgroundColor: "#fff",
    borderColor: "#E0E0E0",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 14,
    color: "#0f7f0f",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#0f7f0f",
    paddingHorizontal: 20,
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
  login: {
    textAlign: "center",
    color: "#4F9673",
    marginBottom: 10,
  },
});
