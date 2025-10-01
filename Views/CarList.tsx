import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from "react-native";
import api from "../Backend/api";
import CarRentalCard from "../CarRentalCard";

interface Car {
  car_id: number;
  brand: string;
  model: string;
  description: string;
  price: number;
  fuel_type: string;
  fuel_economy?: string;
  range?: number;
  seats: number;
  location: string;
  images: string; // JSON string array
  owner_id: number;
}

export default function CarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Car[]>("/getCars")
      .then(res => setCars(res.data))
      .catch(err => console.warn("API error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.car_id.toString()}
        renderItem={({ item }) => (
            <CarRentalCard image={require('../assets/red-sports-car-png-1.png')}
            rental_price={item.price}model={item.model} brand={item.brand}/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  card: { padding: 12, marginBottom: 10, borderWidth: 1, borderRadius: 8, borderColor: "#ccc" },
  title: { fontSize: 18, fontWeight: "bold" },
  image: { width: "100%", height: 200, marginTop: 8, borderRadius: 8 },
});
