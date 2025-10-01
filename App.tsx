
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CarRentalCard from './CarRentalCard'
import CarList from './Views/CarList';

export default function App() {
  return (
    <View>
      <Text>Hello</Text>
      <CarList></CarList>
      <Text>Goodbye</Text>
    </View>
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