// components/Stock.tsx
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from "../config/config.json";

function StockList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));
  }, []);

  const list = products.map((product, index) => <Text key={index} > {product.name} - {product.stock}</Text >);

  return (
    <View>
      {list}
    </View>
  );
}

const styles = StyleSheet.create({
  stock: {
    color: '#45062e',
    fontSize: 26,
    marginTop: 10,
  },
});

export default function Stock() {
  return (
    <View>
      <Text style={styles.stock}>Lagerförteckning</Text>
      <StockList />
    </View>
  );
}