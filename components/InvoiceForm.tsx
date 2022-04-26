
import { ScrollView, Text, TextInput, Button, View, Platform } from "react-native";
import { Typography, Base, Forms } from "../styles";
import orderModel from "../models/orders";
import invoiceModel from '../models/invoices';
import { useEffect, useState } from "react";
// import { Order } from '../interfaces/order';
import { Picker } from '@react-native-picker/picker';
import Invoice from "../interfaces/invoice";
import Order from "../interfaces/order";
import DateTimePicker from '@react-native-community/datetimepicker';

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };


    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setInvoice({
                            ...props.invoice,
                            creation_date: date.toLocaleDateString('se-SV'),
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

function OrderDropDown(props) {
    let orderHash: any = {};

    function getTotalPrice(order: Partial<Order>) {
        return order.order_items.reduce((sum, add) => sum + (add.price * add.amount), 0);
    }

    const itemsList = props.allOrders.filter(order => order.status === "Packad" || order.status === "Sickad")
        .map((order, index) => {
            orderHash[order.id] = order;
            return <Picker.Item key={index} label={order.name} value={order.id} />;
        });

    return (
        <Picker
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                if (itemValue !== "0") {
                    props.setInvoice({ ...props.invoice, order_id: itemValue, total_price: getTotalPrice(orderHash[itemValue]) });
                    props.setCurrentOrder(orderHash[itemValue]);
                }
            }}>
            <Picker.Item label="Välj order" value="0" />
            {itemsList}
        </Picker>
    );
}

export default function InvoiceForm({ navigation, allOrders, setAllOrders }) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});
    const [currentOrder, setCurrentOrder] = useState<Partial<Order>>({});

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders())
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    async function addInvoice() {
        await invoiceModel.addInvoice(invoice);
        setAllOrders(await orderModel.getOrders());
        navigation.navigate('List', { reload: true })
        await orderModel.changeStatus(currentOrder, 600)
    }


    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={Typography.header2}>Lägg till ny faktura</Text>
            {/* <Text>Välj order:</Text> */}
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
                setCurrentOrder={setCurrentOrder}
                allOrders={allOrders}
                setAllOrders={setAllOrders}
            />
            <DateDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />
            <Button
                title="Lägg till"
                onPress={addInvoice} />
        </ScrollView>
    )
};