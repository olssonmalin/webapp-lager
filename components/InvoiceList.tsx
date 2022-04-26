import { View, ScrollView, Text, Button } from "react-native"
import { useEffect } from "react";
import { Typography, Base } from "../styles";
import invoiceModel from '../models/invoices';
import { DataTable } from 'react-native-paper';


export default function InvoiceList({ navigation, logout, invoices, setInvoices, route }) {

    // Hämta fakturor
    const { reload } = route.params || false;
    if (reload) {
        reloadInvoices();
    }
    async function reloadInvoices() {
        setInvoices(await invoiceModel.getInvoices());
    }

    useEffect(async () => {
        setInvoices(await invoiceModel.getInvoices());
    }, []);

    let listOfInvoices;
    if (invoices.length > 0) {
        listOfInvoices = invoices.map((item, index) => {
            return (
                <DataTable.Row key={index}>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell>{item.total_price}</DataTable.Cell>
                    <DataTable.Cell>{item.due_date}</DataTable.Cell>
                </DataTable.Row>)
        });
    } else {
        listOfInvoices = <Text style={{ ...Typography.normal }}>Inga fakturor skapade</Text>
    }

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Fakturor</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Cell>Namn</DataTable.Cell>
                    <DataTable.Cell>Pris</DataTable.Cell>
                    <DataTable.Cell>Förfallodatum</DataTable.Cell>
                </DataTable.Header>
                {listOfInvoices}
            </DataTable>

            <Button
                title="Skapa ny faktura"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
            <Button
                title="Logga ut"
                onPress={logout} />
        </ScrollView>
    )
}