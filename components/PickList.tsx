import { View, Text, Button } from "react-native";
import { useState, useEffect } from 'react';
import orderModel from "../models/orders";
import productModel from "../models/products";
import { Base, Typography } from '../styles';

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    useEffect(async () => {
        setProductsList(await productModel.getProducts());
    }, []);

    async function pick() {
        try {
            await orderModel.pickOrder(order);
            setProducts(await productModel.getProducts());
            navigation.navigate("List", { reload: true });
        } catch (error) {
            console.log(error);
        }
    }

    let inStock = true;
    const orderItemsList = order.order_items.map((item, index) => {
        if (item.amount > item.stock) {
            inStock = false;
        }
        return <Text
            key={index}
        >
            Produkt: {item.name} Antal: {item.amount} Hylla: {item.location}
        </Text>;
    });


    return (
        <View style={Base.base}>
            <Text>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>

            <Text>Produkter:</Text>

            {orderItemsList}

            {inStock ? (
                <Button title="Plocka order" onPress={pick} />
            ) : (
                <Button title="Not enough in stock" onPress={pick} disabled />
            )}
        </View>
    )
};