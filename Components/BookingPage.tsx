import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import api from "../Backend/api";

const INPUT_WIDTH = 260; 

interface Rent {
  rent_id: number;
  renter_id: number;
  car_id: number;
  startDate: string;
  endDate: string;
}

export default function BookingPage() {
  const [rents, setRents] = useState<Rent[]>([]);
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState("");     
  const car_id = 1;

  const confirmDates = (startDate: string, endDate: string) => {
    api.post('/getRentsByCar', { car_id, startDate, endDate }
    ).then(res => setRents(res.data))
    .catch(function (error) {
      console.log(error);
    })
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>How long would you like to book the vehicle?</Text>
        <View style={styles.content}>
          <Text style={styles.label}>Start Date</Text>
          <TextInput
            placeholder="DD-MM-YYYY"
            style={styles.input}
            value={startDate}             
            onChangeText={setStartDate}   
          />

          <Text style={styles.label}>End Date</Text>
          <TextInput
            placeholder="DD-MM-YYYY"
            style={styles.input}
            value={endDate}
            onChangeText={setEndDate}
          />

          <Pressable style={styles.button} onPress={() => confirmDates(startDate, endDate)}>
            <Text style={styles.buttonText}>Confirm Dates</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  header: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 225,
  },
  headerTxt: {
    fontSize: 15,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",   
    gap: 12,
    paddingHorizontal: 16,
  },
  label: {
    width: INPUT_WIDTH,
    textAlign: "left",       
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 1,
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
    backgroundColor: "#6351a9",
    marginBottom: 325,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
