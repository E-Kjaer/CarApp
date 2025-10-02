import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CarList from "./Views/CarList";
import DetailedView from "./Components/DetailedView";

export type ExploreStackParamList = {
    CarList: undefined;
    Detailed: { car_id: number };
};

const Stack = createNativeStackNavigator<ExploreStackParamList>();

export default function ExploreStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CarList"
                component={CarList}
                options={{ title: "Explore" }}
            />
            <Stack.Screen
                name="Detailed"
                component={DetailedView}
                options={{ title: "Detaljer" }}
            />
        </Stack.Navigator>
    );
}
