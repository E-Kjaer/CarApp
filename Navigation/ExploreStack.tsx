import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CarList from "../Views/CarList";
import DetailedView from "../Views/DetailedView";
import BookingPage from "../Views/BookingPage";
import ConfirmationPage from "../Views/ConfirmationPage";
import {ExploreStackParamList} from "./ExploreNavTypes";



const Stack = createNativeStackNavigator<ExploreStackParamList>();

export default function ExploreStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerTitle: "",
                headerShadowVisible: false,
                headerTintColor: "#1f1f1f",
            }}>
            <Stack.Screen
                name="CarList"
                component={CarList}
                //options={{ title: "Explore" }}
            />
            <Stack.Screen
                name="Detailed"
                component={DetailedView}
               // options={{ title: "Detaljer" }}
            />
            <Stack.Screen
                name="Booking"
                component={BookingPage}
               // options={{title: "Booking"}}
            />
            <Stack.Screen
                name="Confirmation"
                component={ConfirmationPage}
               // options={{title: "Confirmation"}}
            />
        </Stack.Navigator>
    );
}
