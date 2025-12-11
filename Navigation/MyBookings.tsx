import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookingList } from "../Views/MyBookingsView"


export type BookingListParamList = {
    BookingList: undefined;
};

const Stack = createNativeStackNavigator<BookingListParamList>();
export default function MyBookingsStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerTransparent: true,
            headerTitle: "",
            headerShadowVisible: false,
            headerTintColor: "#1f1f1f",
        }}>
        <Stack.Screen
                        name="BookingList"
                        component={BookingList}
                        //options={{ title: "Explore" }}
                    />
        </Stack.Navigator>
    );
}