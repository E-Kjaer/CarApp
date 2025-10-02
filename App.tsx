import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CarRentalCard from './CarRentalCard'
import BottomNavBar from './Components/BottomNavBar';
import {AuthProvider} from "./Authcontext";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
      <AuthProvider>
        <NavigationContainer>
          <BottomNavBar />
        </NavigationContainer>
      </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

