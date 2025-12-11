import { useEffect, useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer} from "@react-navigation/native";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import CarList from "../Views/CarList";
import LoginPage from "../Views/LoginPage"
import ExploreStack from "./ExploreStack";
import ProfileStack from "./ProfileStack";
import {useAuth} from "../Contexts/Authcontext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import api from "../api";
import MyCarsRentalCard from "../Components/MyCarsRentalCard";



export type RootTabParamList = {
    Home: undefined;
    Settings: undefined;
  };

const Tab = createBottomTabNavigator();

interface myCars {
  owner_id: number,
  car_id: number,
  brand: string,
  model: string,
  image: string
}

function MyCarsScreen() {
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
  function BookingScreen() {
      return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>My Bookings</Text>
          </View>
      );
  }

export default function BottomNavBar() {
    const insets = useSafeAreaInsets();  
    const { user } = useAuth();
    const isOwner = !!Number(user?.is_owner); // makes  0/1, "0"/"1", true/false to boolean values
    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size, focused }) => {
                let name: keyof typeof Ionicons.glyphMap;

                switch (route.name) {
                  case "Explore":
                    name = focused ? "car" : "car-outline";
                    break;
                  case "Bookings":
                    name = focused ? "bookmark" : "bookmark-outline";
                    break;
                  case "MyCars":
                    name = focused ? "clipboard" : "clipboard-outline";
                    break;
                  default:
                    name = focused ? "person" : "person-outline"; // Profile
                }
                return <Ionicons name={name} size={size} color={color} />;
              },
            tabBarActiveTintColor: "#474355",
            tabBarInactiveTintColor: "#474355",
            headerShown: false,
            tabBarInactiveBackgroundColor: "#ECE7F0",
            tabBarActiveBackgroundColor: "#E0D8EF",
            tabBarShowLabel: false,
            tabBarItemStyle: {
              flexDirection: "column"
            },
            tabBarIconStyle: {
              alignItems: "center",
              marginTop: 10,
            },
            tabBarStyle: {
              height: insets.bottom + 30,
              paddingBottom: 0,
              alignItems: "center"
            },
            //tabBarPosition: 100
          })}
        >
          <Tab.Screen name="Explore" component={ExploreStack}/>
            {user && (<Tab.Screen name="Bookings" component={BookingScreen} />
            )}
            {isOwner && (
                <Tab.Screen name="MyCars" component={MyCarsScreen} />
            )}
          <Tab.Screen name = "Profile" component={ProfileStack} />
        </Tab.Navigator>
    );
  }
  
  