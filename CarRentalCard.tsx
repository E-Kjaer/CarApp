import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import type { ImageSourcePropType } from 'react-native';

interface CarProps {
  image: ImageSourcePropType;
  brand: string;
  model: string;
  location: string
  rental_price: number; // per day, in DKK
  onPressRent?: () => void;
}

const CarRentalCard = ({ image, brand, model, location, rental_price, onPressRent }: CarProps) => {
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

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* CTA */}
        <TouchableOpacity activeOpacity={0.85}
                          style={styles.rentButton}
                          onPress={() => {
                            console.log("Rent Now pressed");
                            onPressRent?.();
                          }}>
          <Image source={require('./assets/calendar.png')} style={styles.calendarIcon} />
          <Text style={styles.buttonText}>Rent Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CarRentalCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    gap: 16,
    width: 500,
    margin: 10,

    // subtle drop shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  carImage: {
    width: 240,
    height: 180,
    borderRadius: 16,
    resizeMode: 'cover',
  },

  details: {
    flex: 1,
    paddingVertical: 4,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  brand: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  model: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: '700',
    color: '#6ea4b3',
  },

  priceWrap: {
    //flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },

  priceNumber: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 26,
  },

  priceMeta: {
    fontSize: 14,
    marginTop: 2,
  },

  rentButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: '#6351a9',
  },

  calendarIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: 'contain',
    tintColor: '#fff',
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
});
