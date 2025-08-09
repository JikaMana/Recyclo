import { StyleSheet, TextInput } from "react-native";

export default function ThemedTextInput({ style, ...props }) {
  return (
    <TextInput
      style={[
        {
          backgroundColor: "#fff",
          color: "#0f7f0f",
          borderRadius: 10,
          padding: 20,
          borderWidth: 1,
          borderColor: "#333",
          fontSize: 16,
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({});
