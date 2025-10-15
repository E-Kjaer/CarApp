import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../Contexts/Authcontext";

import ProfileScreenWrapper from "./ProfileScreenWrapper";
import LoginScreen from "../Views/LoginPage";
import SignUpScreen from "../Views/SignupPage";

export type ProfileStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Profile: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();
export default function ProfileStack() {
    const { user } = useAuth();
    return (
        <Stack.Navigator initialRouteName={user ? "Profile" : "Login"} screenOptions={{
            headerTransparent: true,
            headerTitle: "",
            headerShadowVisible: false,
            headerTintColor: "#1f1f1f",
        }}>
            {user ? (
                <Stack.Screen name="Profile" component={ProfileScreenWrapper} />
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                </>
            )}
        </Stack.Navigator>
    );
}