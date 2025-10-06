import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, Pressable } from "react-native";
import api from "../Backend/api";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {ExploreStackParamList} from "../ExploreNavTypes";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

type DetailedRoute = RouteProp<ExploreStackParamList, "Detailed">;
type DetailedNav = NativeStackNavigationProp<ExploreStackParamList, "Detailed">;


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
  user_id: number,
  name: string,
  email: string,
  phonenumber: number,
  rating: number
}

export default function DetailedView() {
  const navigation = useNavigation()
  const { params } = useRoute<DetailedRoute>();
  const [car, setCar] = useState<Car | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
        .get<Car>("/getCar/" + params.car_id)
        .then((res) => setCar(res.data))
        .catch((err) => console.warn("API error:", err))
        .finally(() => setLoading(false));
  }, [params.car_id]);

  useEffect(() => {
    if(!car?.owner_id) return;
    api
      .get<Owner>("/getUser/" + car?.owner_id)
      .then((res) => setOwner(res.data))
      .catch((err) => console.warn("API error", err))
  }, [car?.owner_id]);

  console.log(owner?.user_id);
  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  return (
    <View style={styles.container}>
      {car != null && <Image source={require('../assets/Peugeot_206_front_20090416.jpg')}
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
        <Text style={styles.title}>Info about owner</Text>
        {owner != null && <Text>{`Name:  ${owner.name}`}</Text>}
        {owner != null && <Text>{`Email:  ${owner.email}`}</Text>}
        {owner != null && <Text>{`Phone number:  ${owner.phonenumber}`}</Text>}
        {owner != null && <Text>{`Rating:  ${owner.rating}`}</Text>}

      </View>
      <View style={styles.buttom_bar}>
        <View style={styles.price_container}>
          {car != null && <Text>Price: {car.price} DKK/day</Text>}
        </View>
        <Pressable style={styles.rent_now_button} onPress={() => {
          navigation.navigate("Booking");
        }}>
          <Text style={styles.rent_now_button_text}>Rent Now</Text>
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
    backgroundColor: "#6351a9",
  },
  rent_now_button_text: {
    color: "#fff",
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
    justifyContent: "center",
    maxHeight: 45, 
    padding: 12,
    maxWidth: 100, 
    borderWidth: 1, 
    borderRadius: 24, 
    borderColor: "#ccc",
    backgroundColor: "#FFFFFF",
  },
  tag_text: {
  
  },
  image: { width: "100%", height: 200, marginTop: 8, borderRadius: 8 },
});
