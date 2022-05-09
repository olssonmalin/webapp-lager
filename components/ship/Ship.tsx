import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipList from './ShipList';
import ShipOrder from './ShipOrder';

const Stack = createNativeStackNavigator();

export default function Ship(props) {
    return (
        <Stack.Navigator initialRouteName="List" >
            <Stack.Screen name="List" >
                {(screenProps) => <ShipList {...screenProps} allOrders={props.allOrders} setAllOrders={props.setAllOrders} />}
            </Stack.Screen>
            <Stack.Screen name="Details">
                {(screenProps) => <ShipOrder {...screenProps} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}