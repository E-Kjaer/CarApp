
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CarRentalCard from './CarRentalCard'
import BottomNavBar from './Components/BottomNavBar';

export default function App() {
  return <BottomNavBar/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

