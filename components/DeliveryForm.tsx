import { useState, useEffect } from 'react';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { Base, Typography, Forms } from '../styles';
import { showMessage } from "react-native-flash-message";
import Delivery from '../interfaces/delivery';
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";
import deliveryModel from "../models/deliveries";

import DateTimePicker from '@react-native-community/datetimepicker';

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };


    return (
        <View
            testID='date-picker-field'
        >
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    style={{ ...Forms.input }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}
            testID="products-field"
        >
            {itemsList}
        </Picker>
    );
}


export default function DeliveryForm({ navigation, setProducts }) {

    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    async function addDelivery() {
        delivery.delivery_date = delivery.delivery_date ?? new Date().toLocaleDateString('se-SV');

        if (validateForm()) {
            await deliveryModel.addDelivery(delivery);
            const updatedProduct = {
                ...currentProduct,
                stock: (currentProduct.stock || 0) + (delivery.amount || 0)
            };

            await productModel.updateProduct(updatedProduct);
            setProducts(await productModel.getProducts());
            navigation.navigate("List", { reload: true });
        }
    }

    function validateForm() {
        // console.log(delivery);
        const expected_keys = ["amount", "comment", "delivery_date", "product_id"];
        const translated = {
            "amount": "Antal",
            "comment": "Kommentar",
            "delivery_date": "Leveransdatum",
            "product_id": "Produkt-id"
        }

        for (const key of expected_keys) {
            if (!(key in delivery)) {
                showMessage({
                    message: "Formulär ej komplett",
                    description: `${translated[key]} är inte ifyllt, fyll i och pröva igen`,
                    type: "warning"
                });
                return false;
            }
        }
        showMessage({
            message: "Registrerad",
            description: "Inleveransen är nu registrerad",
            type: 'success'
        });
        return true;
    }

    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>Ny inleverans</Text>

            <Text style={{ ...Typography.label }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={{ ...Typography.label }}>Antal</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
                testID='amount-field'
            />

            <Text style={{ ...Typography.label }}>Kommentar</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
                testID="comment-field"
            />


            <Text style={{ ...Typography.label }}>Datum</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}

            />

            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery();
                }}
            />
        </ScrollView>
    );
};