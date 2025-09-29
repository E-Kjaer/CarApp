import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import api from "./Backend/api";

export default function CarList() {
  const [cars, setCars] = useState<any[]>([]);

  useEffect(() => {
    api.get("/cars")
      .then(res => setCars(res.data))
      .catch(err => console.warn("API error:", err?.message || err));
  }, []);

  return (
    <View>
      {cars.map(c => <Text key={c.car_id}>{c.brand} {c.model}</Text>)}
    </View>
  );
}