import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import config from "./../config/config.json";
import orderModel from "../models/orders";
import { Base, Typography } from '../styles';


export default function OrderList({ route, navigation, allOrders, setAllOrders }) {
    const { reload } = route.params || false;
    // const [allOrders, setAllOrders] = useState([]);


    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    useEffect(() => {
        fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setAllOrders(result.data));
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View style={Base.base}>
            <Text style={Typography.normal}>Ordrar redo att plockas</Text>
            {listOfOrders}
        </View>
    );
}