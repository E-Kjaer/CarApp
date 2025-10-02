import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer} from "@react-navigation/native";
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import CarList from "../Views/CarList";
import LoginPage from "./LoginPage"
import ProfileStack from "../Navigation/ProfileStack";

export type RootTabParamList = {
    Home: undefined;
    Settings: undefined;
  };

const Tab = createBottomTabNavigator();

// Dummy Settings-skærm
function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>⚙️ Settings</Text>
      </View>
    );
  }

export default function BottomNavBar() {
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
            tabBarLabel: ""

          })}
        >
          <Tab.Screen name="Explore" component={CarList}/>
          <Tab.Screen name="Bookings" component={SettingsScreen} />
          <Tab.Screen name="MyCars" component={SettingsScreen} />
          <Tab.Screen name = "Profile" component={ProfileStack} />
        </Tab.Navigator>
    );
  }
  
  