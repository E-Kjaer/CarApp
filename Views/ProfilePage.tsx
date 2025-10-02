import React from "react";
import { StyleSheet, Text, View, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

interface ProfilePageProps {
    image: ImageSourcePropType;
    details: string;
    username: string;
    info: string;
    onSettings?: () => void;
    onSupport?: () => void;
}

const ProfilePage = ({ image, details, username, info, onSettings, onSupport }: ProfilePageProps) => {
    return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onSettings}>
          <Ionicons name="settings-outline" size={28} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onSupport}>
          <Ionicons name="help-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Profile */}
      <View style={styles.profileCard}>
        <View style={styles.topRow}>
          <Image source={image} style={styles.profileImage}/>
          <Text style={styles.username}>{username}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.info}>{info}</Text>
          <Text style={styles.details}>{details}</Text>
        </View>
      </View>
    </View>
    );
};  

export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 40,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 16,
        width: "92%",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 16,
    },
    username: {
        fontSize: 22,
        fontWeight: "bold",
    },
    infoSection: {
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 12,
    },
    info: {
        fontSize: 16,
        color: '#333',
        marginBottom: 6,
    },
    details: {
        fontSize: 16,
        color: '#333',
    },
});
