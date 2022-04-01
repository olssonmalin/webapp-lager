import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  // Roboto_100Thin,
  // Roboto_100Thin_Italic,
  // Roboto_300Light,
  // Roboto_300Light_Italic,
  Roboto_400Regular,
  // Roboto_400Regular_Italic,
  Roboto_500Medium,
  // Roboto_500Medium_Italic,
  // Roboto_700Bold,
  // Roboto_700Bold_Italic,
  // Roboto_900Black,
  // Roboto_900Black_Italic
} from '@expo-google-fonts/roboto'
import candy from './assets/klubba.jpg';
import Stock from './components/Stock.tsx';

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium
  }); if (!fontsLoaded) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.base}>
        <Text style={{ color: '#45062e', fontSize: 42, fontFamily: 'Roboto_500Medium', letterSpacing: 1.2, marginBottom: 5, marginTop: 5 }}>Lager-Appen</Text>
        <Image source={candy} style={{ width: 420, height: 190 }} />
        <StatusBar style="auto" />
        <Stock />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd5d7',
  },
  base: {
    flex: 1,
    backgroundColor: '#ffd5d7',
    paddingLeft: 12,
    paddingRight: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
});