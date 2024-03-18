import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './App/Screens/HomeScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavigation from './App/Navigations'

export default function App() {
  return (
    
      
           <AppNavigation />
    
    
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
