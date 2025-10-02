import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { AuthProvider, useAuth } from "../Authcontext";
import { useState } from 'react'
import api from "../Backend/api";
import SignupPage from "./SignupPage";

import { User } from "../Authcontext"


export default function App() {
  return (
    <AuthProvider>
      <LoginScreen/>
    </AuthProvider>

  );
}


function LoginScreen() {
    const {user, login, logout} = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const checkLogin = (username: string, password: string) => {
        api.post('/login', {
    identifier: username,
    password: password
  })
  .then(res => login(res.data))
  .catch(function (error) {
    console.log(error);
  });
  }

  return (
    <View style={styles.rootbox}>
      <View style={styles.outerbox}>
        <Text>Login In Screen</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(newText) => {setUsername(newText)}}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(newText) => {setPassword(newText)}}
          style={styles.input}
        />

        <TouchableOpacity style={styles.loginButton}
              onPress={() => {checkLogin(username, password)}}>
          <Text>Login</Text>
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
    justifyContent: 'center',
  },
  rootbox: {
    justifyContent: "center",
    paddingTop: "75%"

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



})

