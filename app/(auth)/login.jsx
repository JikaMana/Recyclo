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

export default function Login() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#F6F8F7" }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Welcome Back</Text>

        <ThemedTextInput
          placeholder="Phone Number"
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

        <TouchableOpacity style={styles.button}>
          {/* this is experimntal make sure to remove */}
          <Link href="home">
            <Text style={styles.buttonText}>Login</Text>
          </Link>
        </TouchableOpacity>
      </ScrollView>
      <Link href="register" style={styles.register}>
        <Text>Don't have an account?</Text>
        <Text>Sign Up</Text>
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
  register: {
    textAlign: "center",
    color: "#4F9673",
    marginBottom: 10,
  },
});
