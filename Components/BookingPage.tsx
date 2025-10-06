import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import api from "../Backend/api";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {ExploreStackParamList} from "../ExploreNavTypes";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

type BookingRoute = RouteProp<ExploreStackParamList, "Booking">;
type BookingNav = NativeStackNavigationProp<ExploreStackParamList, "Booking">;

const INPUT_WIDTH = 260; 

interface Rent {
  rent_id: number;
  renter_id: number;
  car_id: number;
  start_date: number;
  end_date: number;
}

export default function BookingPage() {
  const navigation = useNavigation<BookingNav>();
  const { params } = useRoute<BookingRoute>();
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>How long would you like to book the vehicle?</Text>
        <View style={styles.content}>
          <Text style={styles.label}>Start Date</Text>
          <TextInput
            placeholder="YYYY-MM-DD"
            style={styles.input}
            value={start_date}             
            onChangeText={setStartDate}   
          />

          <Text style={styles.label}>End Date</Text>
          <TextInput
            placeholder="YYYY-MM-DD"
            style={styles.input}
            value={end_date}
            onChangeText={setEndDate}
          />

          <Pressable
            style={styles.button}
            onPress={async () => {
              try {
                await api.post('/insertRents', { renter_id: 1, car_id: 1, start_date, end_date });
                navigation.navigate('Confirmation', { start_date, end_date });
              } catch (e: any) {
                console.log('POST error:', e?.response?.data || e?.message);
              }
            }}

          >
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
