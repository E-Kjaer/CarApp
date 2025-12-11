import { useState, useEffect } from "react";
import api from "../api";
import { useAuth } from "../Contexts/Authcontext";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BookedCarCard from "../Components/BookedCarCard";
import { useIsFocused } from "@react-navigation/native";

interface Booking {
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
  start_date: string;
  end_date: string;
}

export default function BookingList() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [active] = useState<Booking[]>([]);
  const isFocused = useIsFocused();
  const { user } = useAuth();

  const fetchCars = () => {
    setLoading(true);
    api
      .get<Booking[]>(`/users/${user?.user_id}/rents`, {})
      .then((res) => {
        console.log(res.data);
        setBookings(res.data);
      })
      .catch((err) => console.warn("API error:", err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isFocused) {
      fetchCars();
    }
  }, [active, isFocused]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  return (
    <View
      style={{
        flex: 1,
        marginTop: insets.top + 20,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.car_id.toFixed.toString()}
        renderItem={({ item }) => (
          <BookedCarCard
            image={{ uri: `http://localhost:3000/${item.image}` }}
            rental_price={item.price}
            model={item.model}
            location={item.location}
            brand={item.brand}
            start_date={item.start_date}
            end_date={item.end_date}
          />
        )}
      />
    </View>
  );
}
