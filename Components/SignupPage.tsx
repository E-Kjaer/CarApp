import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Text,
} from "react-native";
import { useAuth } from "../Authcontext";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import api from "../Backend/api";

export default function SignupScreen({ navigation }: any) {
    const { user, login, logout } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [password, setPassword] = useState("");
    const [is_owner, setIs_Owner] = useState(false);

    const signUp = (
        username: string,
        password: string,
        email: string,
        name: string,
        phonenumber: string,
        is_owner: boolean
    ) => {
        api
            .post("/insertUser", {
                username: username,
                password: password,
                email: email,
                name: name,
                phonenumber: phonenumber,
                is_owner: is_owner ? 1 : 0,
                rating: null
            })
            .then((res) => {
                console.log('API Response:', res.data);
                login(res.data.user);
                navigation.navigate("Profile");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View style={styles.rootbox}>
            <View style={styles.outerbox}>
                <Text>Sign Up</Text>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Phone number"
                    value={phonenumber}
                    onChangeText={setPhonenumber}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Full Name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />

                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
                    <Checkbox
                        value={is_owner}
                        onValueChange={setIs_Owner}
                        color={is_owner ? "#2196F3" : undefined}
                        style={styles.checkbox}
                    />
                    <Text>Are you an owner?</Text>
                </View>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => signUp(username, password, email, name, phonenumber, is_owner)}
                >
                    <Text>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerbox: {
        backgroundColor: "#f5f5f5",
        padding: 20,
        margin: 20,
        justifyContent: "center",
    },
    rootbox: {
        justifyContent: "center",
        paddingTop: "75%",
    },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    loginButton: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    checkbox: {
        marginRight: 8,
    },
});