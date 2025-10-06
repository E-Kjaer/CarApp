import { useEffect, useState } from "react";
import {View, Text, StyleSheet, ActivityIndicator, FlatList, TextInput, TouchableOpacity,} from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import api from "../Backend/api";
import CarRentalCard from "../CarRentalCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import FilterBar from "../Components/FilterBar";
import {ExploreStackParamList} from "../ExploreStack";
import {useNavigation} from "@react-navigation/native";

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
  images: string;
  owner_id: number;
}

type ExploreNav = NativeStackNavigationProp<ExploreStackParamList, "CarList">;


export default function CarList() {
  const navigation = useNavigation<ExploreNav>();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");             // location search
  const [active, setActive] = useState<string[]>([]); // active filter search


  const fetchCars = () => {
    setLoading(true);
    api.get<Car[]>("/filterCars", {
      params: {
        fuel_type: active.includes("electric") ? "Electric" : undefined,
        seats:  active.includes("seats6") ? 6 : undefined,
        maxPrice:  active.includes("budget") ? 25000 : undefined,
        brand:  active.includes("luxury") ? "BMW" : undefined,
        location:  query || undefined,
      },
    })
        .then((res) => setCars(res.data))
        .catch((err) => console.warn("API error:", err))
        .finally(() => setLoading(false));
  };

  // Get cars the first time (no filter)
  useEffect(() => {
    fetchCars();
  }, [active]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
            placeholderTextColor={"#999999"}
            placeholder="Search location..." style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            onSubmitEditing={fetchCars}
        />
        <TouchableOpacity onPress={fetchCars}>
          <Ionicons name="search" size={24} style={styles.searchIcon}  />
        </TouchableOpacity>
      </View>
      <FilterBar active={active}
                 onToggle={(id: string) =>
                     setActive((prev) =>
                         prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
                     )
                 }>
      </FilterBar>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.car_id.toString()}
        renderItem={({ item }) => (
            <CarRentalCard image={require('../assets/red-sports-car-png-1.png')}
             rental_price={item.price}
             model={item.model}
             brand={item.brand}
             location={item.location}
             onPressRent={()=>
                 navigation.navigate("Detailed", { car_id: item.car_id })
             }
            />
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
  searchBar: {
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECE7F0",
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 6,
    fontSize: 16,
    color: "#999999",

  },
  searchIcon: {
    marginLeft: 8,
    color: "#999999",
  },
});
