import React from "react";
import ProfilePage from "../Views/ProfilePage";
import { useAuth } from "../Contexts/Authcontext";

export default function ProfileScreenWrapper() {
    const { user } = useAuth();
    if (!user) {
        return null;
    }
    return (
        <ProfilePage
            image={require("../assets/profileicon.png")}
            username={user.name ? String(user.name) : "Unknown User"}
            details={user.email ? String(user.email) : "No email"}
            info={`Phone: ${user.phonenumber ? String(user.phonenumber) : "No phonenumber"}`}
        />

    );
}