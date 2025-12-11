import { useState, useEffect} from "react";
import api from "../api";
import { useAuth } from "../Contexts/Authcontext";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TextInput, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CarRentalCard from "../Components/CarRentalCard";


interface Car {
    car_id: number;
    brand: string;
    model: string;
    description: string;
    price: number;
    fuel_type: string;
    fuel_econemy?: string;
    range?: number;
    seats: number;
    location: string;
    image: string;
    owner_id: number;
}

export default function BookingList() {
    const insets = useSafeAreaInsets();
    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState<Car[]>([]);

    const fetchCars = () => {
        api.get<Car[]>("/getRentsByRenter/:id", {
            params: {
                id: 5
            },
        })
        .then((res) => setCars(res.data))
        .catch((err) => console.warn("API error:", err))
        .finally(() => {
            setLoading(false);
        })
    };

    useEffect(() => {
        fetchCars();
    }, );

 if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  return (
    <View style={{ flex: 1, marginTop: insets.top + 20, paddingLeft: 16, paddingRight: 16}}>
        <FlatList
            data = {cars}
            keyExtractor={(item) => item.car_id.toFixed.toString()}
            renderItem={({ item }) => (
                <CarRentalCard
                    image={{uri: `http://localhost:3000/${item.image}`}}
                    rental_price = {item.price}
                    model = {item.model}
                    location = {item.location}
                    brand = {item.brand}
                    />
            )}
        />
    </View>
  )
}


const styles = StyleSheet.create({
    card: { padding: 12, marginBottom: 10, borderWidth: 1, borderRadius: 8, borderColor: "#ccc"}
});