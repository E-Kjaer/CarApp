import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CarRentalCard from './Components/CarRentalCard'
import BottomNavBar from './Navigation/BottomNavBar';
import {AuthProvider} from "./Contexts/Authcontext";
import {NavigationContainer} from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
      <AuthProvider>
        <NavigationContainer>
          <SafeAreaProvider>
            <BottomNavBar/>
          </SafeAreaProvider>
        </NavigationContainer>
      </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});

