import { useEffect, useState } from "react";
import { DataTable } from 'react-native-paper';
import { Base, Typography } from '../styles';
import productModel from "../models/products";
import { View, Text } from "react-native";


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

export default function StockList({ products, setProducts }) {

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);


    let [fontsLoaded] = useFonts({
        Roboto_400Regular
    });

    // const list = products.map((product, index) => <Text key={index} > {product.name} - {product.stock}</Text >);
    const list = products.map((product, index) => {
        return <DataTable.Row
            key={index}
            style={{ ...Typography.normal }}
        >
            <DataTable.Cell>{product.name}</DataTable.Cell>
            <DataTable.Cell>{product.stock}</DataTable.Cell>
        </DataTable.Row>
    });
    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Produkt</DataTable.Title>
                <DataTable.Title>Antal</DataTable.Title>
            </DataTable.Header>
            {list}
        </DataTable>
    );
}