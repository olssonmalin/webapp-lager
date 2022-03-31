import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import candy from './assets/klubba.jpg';
import Stock from './components/Stock.tsx';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.base}>
        <Text style={{ color: '#45062e', fontSize: 42 }}>Lager-Appen</Text>
        <Image source={candy} style={{ width: 320, height: 240 }} />
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