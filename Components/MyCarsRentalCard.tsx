import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import type { ImageSourcePropType } from "react-native";

interface CarProps {
  image: ImageSourcePropType;
  brand: string;
  model: string;
}

const CarRentalCard = ({ image, brand, model }: CarProps) => {
  return (
    <View style={styles.card}>
      {/* Left: car image */}
      <Image source={image} style={styles.carImage} />

      {/* Right: details */}
      <View style={styles.details}>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.model}>{model}</Text>
      </View>
    </View>
  );
};

export default CarRentalCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 30,
    gap: 16,
    flex: 1,
    width: 300,
    margin: 10,

    // subtle drop shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    alignItems: "center",
  },

  carImage: {
    width: 120,
    height: 100,
    borderRadius: 16,
    resizeMode: "contain",
  },

  details: {
    flex: 1,
    verticalAlign: "auto",
  },

  brand: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  model: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: "700",
    color: "#6ea4b3",
  },
});
