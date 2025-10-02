import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, Pressable } from "react-native";
import api from "../Backend/api"; // adjust path

interface Props {
  car_id: number
}

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
  images: string[]; // JSON string array
  owner_id: number;
  year: number;
}

interface Owner {
  owner_id: number,
  rating: number
}

export default function DetailedView(props: Props) {
  const testCar = {
    car_id: 1,
    brand: "Tesla",
    model: "Model 3",
    description: "An electric box on wheels",
    price: 249,
    fuel_type: "Electric",
    range: 350,
    seats: 5,
    location: "Solrød",
    images: ["../assets/Peugeot_206_front_20090416.jpg"], // JSON string array
    owner_id: 1,
    year: 2020
  }

  const [car, setCar] = useState<Car | null>(testCar);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Car>("/getCar/" + props.car_id)
      .then(res => setCar(res.data))
      .catch(err => console.warn("API error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      {car != null && <Image 
        source={{ uri: car.images[0]}}
        style={styles.image}
      />}
      <View style={styles.brand_container}>
        {car != null && <Text style={styles.title}>{car.brand} {car.model}</Text>}
        {car != null && <Text style={styles.sub_title}>{car.year}</Text>}
      </View>
      <View style={styles.tags_container}>
        <View style={styles.tag}>
          {car != null && <Text style={styles.tag_text}>{car.fuel_type}</Text>}
        </View>
        <View style={styles.tag}>
          {car != null && <Text style={styles.tag_text}>{car.range} km</Text>}
        </View>
        <View style={styles.tag}>
          {car != null && <Text style={styles.tag_text}>{car.seats} seats</Text>}
        </View>
      </View>
      <View style={styles.information_container}>
        <Text style={styles.title}>Vehicle Information</Text>
        {car != null && <Text>{car.description}</Text>}
      </View>
      <View style={styles.information_container}>
        <Text style={styles.title}>Owner</Text>
        {car != null && <Text>{car.owner_id}</Text>}
      </View>
      <View style={styles.buttom_bar}>
        <View style={styles.price_container}>
          {car != null && <Text>Price: {car.price} DKK/day</Text>}
        </View>
        <Pressable style={styles.rent_now_button} onPress={() => {console.log("Rent now Clicked")}}>
          <Text>Rent Now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, backgroundColor: "#F2EDF6", width: 400, height: 800},
  brand_container: { 
    flex: 1 , 
    flexDirection: "row", 
    justifyContent: "space-between",
    maxHeight: 45, 
    padding: 12, 
    marginBottom: 10,
    marginLeft: 16,
    marginRight: 16, 
    borderWidth: 1, 
    borderRadius: 8, 
    borderColor: "#ccc",
    backgroundColor: "#FFFFFF" 
  },
  information_container: {
    flex: 1 , 
    flexDirection: "column", 
    padding: 12, 
    marginBottom: 10, 
    marginLeft: 16,
    marginRight: 16, 
    borderWidth: 1, 
    borderRadius: 8, 
    borderColor: "#ccc",
    backgroundColor: "#FFFFFF" 
  },
  title: { fontSize: 18, fontWeight: "bold" },
  sub_title: { fontSize:18 },
  price_container: {
    padding: 12, 
    marginBottom: 10, 
    height: 45,
    borderWidth: 1, 
    borderRadius: 8, 
    borderColor: "#ccc", 
    backgroundColor: "#FFFFFF"
  },
  rent_now_button: {
    padding: 12, 
    marginBottom: 10, 
    height: 45,
    borderWidth: 1, 
    borderRadius: 8, 
    borderColor: "#ccc",
  },
  buttom_bar: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 100,
    width: "100%",
    paddingLeft: 32,
    paddingTop: 16,
    paddingRight: 32,
    justifyContent: "space-between",
    backgroundColor: "#E8DEF8", 
  },
  tags_container: {
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-between",
    maxHeight: 45, 
    marginBottom: 10,
    marginLeft: 16,
    marginRight: 16, 
  },
  tag: {
    flex: 1, 
    flexDirection: "row", 
    justifyContent: "space-between",
    maxHeight: 45, 
    padding: 12,
    maxWidth: 100, 
    borderWidth: 1, 
    borderRadius: 24, 
    borderColor: "#ccc",
    backgroundColor: "#FFFFFF",
  },
  tag_text: {
    textAlign: "center",
  },
  image: { width: "100%", height: 200, marginTop: 8, borderRadius: 8 },
});
