import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Typography, Base } from "../styles";
import authModel from "../models/auth";
import InvoiceList from './InvoiceList';
import InvoiceForm from './InvoiceForm';

const Stack = createNativeStackNavigator();

export default function Invoices(props) {

    async function logout() {
        await authModel.logout();
        props.setIsLoggedIn(false);
    }

    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List">
                {(screenProps) => <InvoiceList {...screenProps} logout={logout} invoices={props.invoices} setInvoices={props.setInvoices} />}
            </Stack.Screen>
            <Stack.Screen name="Form">
                {(screenProps) => <InvoiceForm {...screenProps} allOrders={props.allOrders} setAllOrders={props.setAllOrders} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}