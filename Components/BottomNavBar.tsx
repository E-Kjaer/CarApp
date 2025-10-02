import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer} from "@react-navigation/native";
import { StyleSheet, Text, View } from 'react-native';
import Home from "/Users/christinagrevy/projects/CarApp/Home";
import Icon from 'react-native-ionicons';

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
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === "Home") {
                iconName = focused
                  ? "ios-information-circle"
                  : "ios-information-circle-outline";
              } else if (route.name === "Settings") {
                iconName = focused ? "ios-list" : "ios-list-outline";
              }
  
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
  