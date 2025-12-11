import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import type { ImageSourcePropType } from "react-native";

interface CarProps {
  image: ImageSourcePropType;
  brand: string;
  model: string;
  location: string;
  rental_price: number; // per day, in DKK
  start_date: string;
  end_date: string;
}

const BookedCarCard = ({
  image,
  brand,
  model,
  location,
  rental_price,
  start_date,
  end_date,
}: CarProps) => {
  return (
    <View style={styles.card}>
      {/* Left: car image */}
      <Image source={image} style={styles.carImage} />

      {/* Right: details */}
      <View style={styles.details}>
        {/* Top row: brand/model (left) + price (right) */}
        <View style={styles.headerRow}>
          <View style={{ flexShrink: 1 }}>
            <Text style={styles.brand}>{brand}</Text>
            <Text style={styles.model}>{model}</Text>
            <Text>{location}</Text>
          </View>

          <View style={styles.priceWrap}>
            <Text style={styles.priceNumber}>{rental_price}</Text>
            <Text style={styles.priceMeta}> DKK/day</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookedCarCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
    gap: 16,
    flex: 1,
    //width: 500,
    margin: 10,

    // subtle drop shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  carImage: {
    width: 120,
    height: 100,
    borderRadius: 16,
    resizeMode: "contain",
  },

  details: {
    flex: 1,
    paddingVertical: 4,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  brand: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  model: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: "700",
    color: "#6ea4b3",
  },

  priceWrap: {
    //flexDirection: 'row',
    marginLeft: "auto",
    alignItems: "flex-end",
  },

  priceNumber: {
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 26,
  },

  priceMeta: {
    fontSize: 14,
    marginTop: 2,
  },
});
