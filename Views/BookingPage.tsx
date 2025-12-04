import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ExploreStackParamList } from "../ExploreNavTypes";
import { Calendar } from "react-native-calendars";
import api from "../Backend/api";


type BookingNav = NativeStackNavigationProp<ExploreStackParamList, "Booking">;

// local YYYY-MM-DD 
function todayISO() {
  const date = new Date();
  const timezone = date.getTimezoneOffset() * 60000;
  const local = new Date(date.getTime() - timezone);
  return local.toISOString().slice(0, 10);
}

export default function BookingPage() {
  const navigation = useNavigation<BookingNav>();

  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  const today = todayISO();

  const onDayPress = (day: any) => {
    const picked = day.dateString;

    // Block past dates
    if (picked < today) return;

    if (!start_date) {
      setStartDate(picked);
    } else if (!end_date) {
      if (picked < start_date) {
        setStartDate(picked);
        setEndDate("");
      } else {
        setEndDate(picked);
      }
    } else {
      setStartDate(picked);
      setEndDate("");
    }
  };

  const markedDates: Record<string, any> = {};
  if (start_date) markedDates[start_date] = { selected: true, selectedColor: "blue" };
  if (end_date) markedDates[end_date] = { selected: true, selectedColor: "green" };

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.headerTxt}>How long would you like to book the vehicle?</Text>

        <Calendar
          onDayPress={onDayPress}
          markedDates={markedDates}
          minDate={today} // <-- prevents selecting past days in the UI
          disableAllTouchEventsForDisabledDays // extra safety for disabled dates
        />

        <Text>
          Start: {start_date || "—"}{"\n"}End: {end_date || "—"}
        </Text>

        <Pressable
          style={[styles.button, (!start_date || !end_date) && { opacity: 0.5 }]}
          disabled={!start_date || !end_date}
          onPress={async () => {
            try {
              await api.post("/insertRents", {
                renter_id: 2, // TODO: replace with actual logged-in user id
                car_id: 1,    // TODO: replace with the selected car’s id
                start_date: start_date.split("-").join(""),
                end_date: end_date.split("-").join(""),
              });

              navigation.navigate("Confirmation", { start_date, end_date });
            } catch (err: any) {
              console.error("Insert rent failed:", err);
            }
          }}
        >
          <Text style={styles.buttonText}>Confirm Dates</Text>
      </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  headerTxt: { fontSize: 18, fontWeight: "bold" },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 325,
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
