import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, Text as RNText } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ExploreStackParamList } from "../ExploreNavTypes";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'

type BookingNav = NativeStackNavigationProp<ExploreStackParamList, "Booking">;


export default function BookingPage() {
  const navigation = useNavigation<BookingNav>();
  {/*const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [start_date, setStartDate] = useState("");
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <RNText style={styles.headerTxt}>How long would you like to book the vehicle?</RNText>
        <View style={styles.content}>
          <RNText style={styles.label}>Start Date</RNText>
          <TextInput placeholder="YYYY-MM-DD" style={styles.input} value={start_date} onChangeText={setStartDate} />
          <RNText style={styles.label}>End Date</RNText>
          <TextInput placeholder="YYYY-MM-DD" style={styles.input} value={end_date} onChangeText={setEndDate} />

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Confirmation", { start_date, end_date })}
          >
            <RNText style={styles.buttonText}>Confirm Dates</RNText>
          </Pressable>
        </View>
      </View>
    </View>
  );*/}
  const [selected, setSelected] = useState("");
  const [end_date, setEndDate] = useState("");
  const [start_date, setStartDate] = useState("");

  return (
    <View style={styles.screen}>
          <View style={styles.content}>
            <RNText style={styles.headerTxt}>How long would you like to book the vehicle?</RNText>
            <Calendar onDayPress={day => {
              setStartDate(day.dateString);
            }}
            markedDates={{
              [start_date]: {selected: true, disableTouchEvent: true, selectedColor: 'blue'}
            }}
            />
            <Pressable style={styles.button} onPress={() => navigation.navigate("Confirmation", {start_date, end_date })}>
              <RNText style={styles.buttonText}>Confirm Dates</RNText>
            </Pressable>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  headerTxt: { fontSize: 18, fontWeight: "bold"},
  content: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12, paddingHorizontal: 16, marginTop: 325 },
  button: { alignSelf: "center", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 999, backgroundColor: "#6351a9", marginBottom: 325 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
