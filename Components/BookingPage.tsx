import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

const INPUT_WIDTH = 260; // tweak as you like

export default function BookingPage() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.label}>Start Date</Text>
        <TextInput placeholder="YYYY-MM-DD" style={styles.input} />

        <Text style={styles.label}>End Date</Text>
        <TextInput placeholder="YYYY-MM-DD" style={styles.input} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Confirm Dates</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  header: {
    
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",   // centers the block horizontally
    gap: 12,
    paddingHorizontal: 16,
  },
  label: {
    width: INPUT_WIDTH,
    textAlign: "left",       
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    width: INPUT_WIDTH,      
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#1e90ff",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
