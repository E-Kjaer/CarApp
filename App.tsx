
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CarRentalCard from './CarRentalCard'

export default function App() {
  return (
    <View style={styles.container}>
      <CarRentalCard image={require('./assets/red-sports-car-png-1.png')}
       rental_price={120}model='A8' brand='Audi'/>
      <CarRentalCard image={require('./assets/Peugeot_206_front_20090416.jpg')}
       rental_price={200}
       brand='Peugeot' 
       model='206+'/>
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