import { useEffect, useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer} from "@react-navigation/native";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import CarList from "../Views/CarList";
import LoginPage from "../Views/LoginPage"
import {useAuth} from "../Contexts/Authcontext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import api from "../api";
import MyCarsRentalCard from "../Components/MyCarsRentalCard";


interface myCars {
  owner_id: number,
  car_id: number,
  brand: string,
  model: string,
  image: string
}

export default function MyCarsView() {
     const [myCars, setMyCars] = useState<myCars[]>([]);
      const [loading, setLoading] = useState(true);
      const {user, login, logout} = useAuth();
      const [active, setActive] = useState<string[]>([]); 

      const fetchMyCars = () => {
    setLoading(true);
    api.get<myCars[]>(`/users/${user?.user_id}/cars`, {
      
    })
        .then((res) => setMyCars(res.data))
        .catch((err) => console.warn("API error:", err))
        .finally(() =>{
            setLoading(false);
        })
  };

  useEffect(() => {
    fetchMyCars();
  }, [active]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>My Cars</Text>
      <FlatList
      data={myCars}
      keyExtractor={(item) => item.car_id.toString()}
      renderItem={({ item }) => (
          <MyCarsRentalCard
              image={{uri: `http://localhost:3000/${item.image}`}}
              model={item.model}
              brand={item.brand}
          />
      )}
      />
    </View>
  );
}
