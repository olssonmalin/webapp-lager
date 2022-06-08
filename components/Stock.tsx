// components/Stock.tsx
import { Text, View, StyleSheet } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../styles';
import StockList from './StockList';

const styles = StyleSheet.create({
  stock: {
    color: '#45062e',
    fontSize: 26,
    fontFamily: 'Roboto_400Regular',
    marginTop: 10,

  },
  stocklist: {
    color: '#45062e',
    fontFamily: 'Roboto_400Regular',
    marginTop: 10,
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 1.4,
  }
});

export default function Stock({ products, setProducts }) {
  return (
    <View>
      <Text style={styles.stock}>Lagerförteckning</Text>
      <StockList products={products} setProducts={setProducts} />
    </View>
  );
}