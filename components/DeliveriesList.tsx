import { useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { Base, Typography } from "../styles";
import deliveryModel from "../models/deliveries";

export default function DeliveriesList({ route, navigation, setProducts, setDeliveries, deliveries }) {
    const { reload } = route.params || false;
    if (reload) {
        reloadDeliveries();
    }
    async function reloadDeliveries() {
        setDeliveries(await deliveryModel.getDeliveries());
    }

    useEffect(async () => {
        setDeliveries(await deliveryModel.getDeliveries());
    }, []);

    let listOfDeliveries;
    if (deliveries.length > 0) {
        listOfDeliveries = deliveries.map((item, index) => {
            return <View
                key={index}
                style={{ ...Base.delivery }}
            >
                <Text style={{ ...Typography.label }}> ID: {item.id} </Text>
                <Text style={{ ...Typography.label }}> Produkt: {item.product_name} </Text>
                <Text style={{ ...Typography.label }}> Antal: {item.amount} </Text>
                <Text style={{ ...Typography.label }}> Datum: {item.delivery_date}</Text>
                <Text style={{ ...Typography.label }}> Kommentar: {item.comment}</Text>
            </View>
        });
    } else {
        listOfDeliveries = <Text>Inga leveranser att visa</Text>
    }

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>
            {listOfDeliveries}
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </ScrollView>
    );
}