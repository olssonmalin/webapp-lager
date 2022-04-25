import { View, Text } from "react-native";
import { Typography, Base } from "../styles";

export default function Invoices(props) {
    return (
        <View style={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>Faktura</Text>
        </View>
    )
}