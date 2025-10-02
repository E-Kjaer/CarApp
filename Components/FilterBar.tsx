import { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type FilterDef = { id: string; label: string; icon: keyof typeof Ionicons.glyphMap };

export const filters: FilterDef[] = [
    { id: "electric", label: "Electric", icon: "battery-charging-outline" },
    { id: "seats6",   label: "6+ Seats", icon: "people-outline" },
    { id: "luxury",   label: "Luxury",   icon: "diamond-outline" },
    { id: "budget",   label: "Budget",   icon: "pricetag-outline" },
];

export default function FilterBar({
    active,
    onToggle,
    }: {
    active: string[];
    onToggle: (id: string) => void;
}) {

    return (
        <View style={{ marginVertical: 10 }}>
            <FlatList
                horizontal
                data={filters}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 8 }}
                renderItem={({ item }) => {
                    const isActive = active.includes(item.id);
                    return (
                        <TouchableOpacity
                            style={[styles.filterButton, isActive && styles.activeFilter]}
                            onPress={() => onToggle(item.id)}
                        >
                            <Ionicons
                                name={item.icon}
                                size={18}
                                color={isActive ? "#fff" : "#333"}
                                style={{ marginRight: 6 }}
                            />
                            <Text
                                style={[styles.filterText, { color: isActive ? "#fff" : "#333" }]}
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        marginRight: 10,
        backgroundColor: "#fff",
    },
    activeFilter: {
        backgroundColor: "#b29ed9",
        borderColor: "#b29ed9",
    },
    filterText: {
        fontSize: 14,
    },
});
