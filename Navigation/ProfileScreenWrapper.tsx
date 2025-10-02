// ProfileScreenWrapper.tsx
import React from "react";
import ProfilePage from "../Views/ProfilePage";
import { useAuth } from "../Authcontext";

export default function ProfileScreenWrapper() {
    const { user } = useAuth();
    // @ts-ignore
    console.log(String(user.name));
    if (!user) {
        return null;
    }

    return (

        <ProfilePage

            image={require("../assets/profileicon.png")}
            username={user.name ? String(user.name) : "Unknown User"}
            details={user.email ? String(user.email) : "No email"}
            info={`Phone: ${user.phonenumber ? String(user.phonenumber) : "N/A"}`}
            onSettings={() => console.log("Settings pressed")}
            onSupport={() => console.log("Support pressed")}
        />

    );
}