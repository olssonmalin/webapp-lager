// components/Stock.tsx
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import config from "../config/config.json";
import productModel from "../models/products";
import { Base, Typography } from '../styles';
import {
  useFonts,
  // Roboto_100Thin,
  // Roboto_100Thin_Italic,
  // Roboto_300Light,
  // Roboto_300Light_Italic,
  Roboto_400Regular,
  // Roboto_400Regular_Italic,
  // Roboto_500Medium,
  // Roboto_500Medium_Italic,
  // Roboto_700Bold,
  // Roboto_700Bold_Italic,
  // Roboto_900Black,
  // Roboto_900Black_Italic
} from '@expo-google-fonts/roboto'

function StockList({ products, setProducts }) {

  useEffect(async () => {
    setProducts(await productModel.getProducts());
  }, []);


  // useEffect(() => {
  //   fetch(`${config.base_url}/products?api_key=${config.api_key}`)
  //     .then(response => response.json())
  //     .then(result => setProducts(result.data));
  // }, []);

  let [fontsLoaded] = useFonts({
    Roboto_400Regular
  }); if (!fontsLoaded) {
    return <></>;
  }

  // const list = products.map((product, index) => <Text style={styles.stocklist} key={index} > {product.name} - {product.stock}</Text >);
  const list = products.map((product, index) => {
    return <Text
      key={index}
      style={{ ...Typography.normal }}
    >
      {product.name} - {product.stock}
    </Text>
  });
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