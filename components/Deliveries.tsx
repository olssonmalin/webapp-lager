// components/Deliveries.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List">
                {(screenProps) => <DeliveriesList {...screenProps} setProducts={props.setProducts} setDeliveries={props.setDeliveries} deliveries={props.deliveries} />}
            </Stack.Screen>
            <Stack.Screen name="Form">
                {(screenProps) => <DeliveryForm {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};