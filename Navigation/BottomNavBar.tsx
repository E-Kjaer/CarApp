import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CarList from "../Views/CarList";
import LoginPage from "../Views/LoginPage";
import ExploreStack from "./ExploreStack";
import ProfileStack from "./ProfileStack";
import { useAuth } from "../Contexts/Authcontext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyBookingsStack from "./MyBookings";

import MyCarsView from "../Views/MyCarsView";

export type RootTabParamList = {
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator();

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
          flexDirection: "column",
        },
        tabBarIconStyle: {
          alignItems: "center",
          marginTop: 10,
        },
        tabBarStyle: {
          height: insets.bottom + 30,
          paddingBottom: 0,
          alignItems: "center",
        },
        //tabBarPosition: 100
      })}
    >
      <Tab.Screen name="Explore" component={ExploreStack} />
      {user && <Tab.Screen name="Bookings" component={MyBookingsStack} />}
      {isOwner && <Tab.Screen name="MyCars" component={MyCarsView} />}
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
