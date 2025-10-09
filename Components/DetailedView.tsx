import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, Pressable } from "react-native";
import api from "../Backend/api";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {ExploreStackParamList} from "../ExploreNavTypes";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Ionicons} from "@expo/vector-icons";

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
  image: string; // JSON string array
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
  const [car, setCar] = useState<Car>();
  const [owner, setOwner] = useState<Owner>();
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
  if (car && owner)
    return (
    <View style={styles.container}>
      <Image source={{uri: `http://localhost:3000/${car.image}`}}
        style={styles.image}
      />
      <View style={styles.brand_container}>
        <Text style={styles.title}>{car.brand} {car.model}</Text>
        <Text style={styles.sub_title}>{car.year}</Text>
      </View>
      <View style={styles.tags_container}>
        <View style={styles.tag}>
          <Ionicons name={"battery-charging-outline"} size={18}
                    style={{ marginRight: 6 }} color="#6351a9"></Ionicons>
          <Text style={styles.tag_text}>{car.fuel_type}</Text>
        </View>
        <View style={styles.tag}>
          <Ionicons name={"analytics-outline"} size={18}
                    style={{ marginRight: 6 }} color="#6351a9"></Ionicons>
          <Text style={styles.tag_text}>{car.range} km</Text>
        </View>
        <View style={styles.tag}>
          <Ionicons name={"people-outline"} size={18}
                    style={{ marginRight: 6 }} color="#6351a9"></Ionicons>
          <Text style={styles.tag_text}>{car.seats} seats</Text>
        </View>
      </View>
      <View style={styles.information_container}>
        <Text style={styles.title}>Vehicle Information</Text>
        <Text>{car.description}</Text>
      </View>
      <View style={styles.information_container}>
        <View style={styles.header_owner}>
          <View style={styles.info}>
            <Ionicons name={"person"} size={32}
                      style={{ marginRight: 6 }} color="#6351a9"></Ionicons>
            <Text style={styles.title}>{owner.name}</Text>
          </View>
        <View style={styles.rating}>
          <Ionicons name={"star"} size={32}
                    style={{ marginRight: 6 }}  color="#6351a9">
          </Ionicons>
          <Text style={styles.title}>{owner.rating}/5</Text>
        </View>
        </View>

        <View style={styles.info}>
          <Ionicons name={"mail"} size={18}
                    style={{ marginRight: 6 }} color="#6351a9"></Ionicons>
          <Text>{owner.email}</Text>
        </View>
        <View style={styles.info}>
          <Ionicons name={"call"} size={18}
                    style={{ marginRight: 6 }} color="#6351a9"></Ionicons>
          <Text>{owner.phonenumber}</Text>
        </View>
      </View>
      <View style={styles.buttom_bar}>
        <View style={styles.price_container}>
          <Text>{car.price} DKK/day</Text>
        </View>
        <Pressable style={styles.rent_now_button} onPress={() => {
          navigation.navigate("Booking");
        }}>
          <Ionicons name={"calendar-outline"} size={18} color={"white"}></Ionicons>
          <Text style={styles.rent_now_button_text}>Rent Now</Text>
        </Pressable>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 0, backgroundColor: "#F2EDF6"},
  brand_container: { 
    flex: 1 , 
    flexDirection: "row", 
    justifyContent: "space-between",
    maxHeight: 45, 
    padding: 12, 
    marginBottom: 10,
    marginLeft: 16,
    marginRight: 16, 
    borderWidth: 0,
    borderRadius: 8, 
    backgroundColor: "#FFFFFF"
  },
  information_container: {
    flex: 1 , 
    flexDirection: "column", 
    padding: 12, 
    marginBottom: 10, 
    marginLeft: 16,
    marginRight: 16, 
    borderRadius: 8,
    backgroundColor: "#FFFFFF"
  },
  title: { fontSize: 18, fontWeight: "bold" },
  sub_title: { fontSize:18 },
  price_container: {
    padding: 12, 
    marginBottom: 10, 
    height: 45,
    borderWidth: 0,
    borderRadius: 8, 
    backgroundColor: "#FFFFFF"
  },
  rent_now_button: {
    flexDirection: "row",
    padding: 12, 
    marginBottom: 10, 
    height: 45,
    borderWidth: 0,
    borderRadius: 8, 
    backgroundColor: "#6351a9",
  },
  rent_now_button_text: {
    marginLeft: 3,
    color: "#fff",
  },
  buttom_bar: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 100,
    width: "100%",
    paddingLeft: 16,
    paddingTop: 16,
    paddingRight: 16,
    justifyContent: "space-between",
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
    alignItems: "center",
    maxHeight: 35,
    padding: 12,
    maxWidth: 100, 
    borderWidth: 1, 
    borderRadius: 24, 
    borderColor: "#6351a9",
    backgroundColor: "#FFFFFF",
  },
  tag_text: {
    color: "#6351a9",
  
  },
  header_owner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 2,
    borderColor: "#6351a9"
  },
  info: {
    flexDirection: "row",
    alignItems: "center"
  },
  rating: {
    flexDirection: "row",
    alignItems: "center"
  },
  image: { width: "100%", height: 200, marginTop: 8, borderRadius: 8 },
});
