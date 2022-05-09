import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Base, Typography } from "../../styles";

import orderModel from '../../models/orders';

export default function ShipList({ route, navigation, allOrders, setAllOrders }) {
    const { reload } = route.params || false;


    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status_id >= 200)
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
            <Text style={Typography.normal}>Ordrar redo all skickas, klicka för att se detaljer.</Text>
            {listOfOrders}
        </View>)
};
