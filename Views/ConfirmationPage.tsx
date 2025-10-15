import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { ExploreStackParamList } from "../Navigation/ExploreNavTypes";

type ConfirmationNav = RouteProp<ExploreStackParamList, "Confirmation">;

export default function ConfirmationPage() {
  const { params } = useRoute<ConfirmationNav>();
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Booking confirmed</Text>
        <Text style={styles.dateText}>{`From ${params?.start_date ?? "?"} to ${params?.end_date ?? "?"}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  header: { alignItems: "center", flex: 1, justifyContent: "center", paddingHorizontal: 16, marginBottom: 225 },
  headerTxt: { fontSize: 40, fontWeight: "bold" },
  dateText: { fontSize: 20 }
});
