// auth/AuthFields.tsx
import { View, Text, TextInput, Button } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Typography, Forms, Base } from '../../styles';

export default function AuthFields({ auth, setAuth, title, submit, navigation }) {

    function validatePassword(text: string) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).{4,}$/;

        if (!text.match(pattern)) {
            showMessage({
                message: "Icke giltigt lösenord",
                description: "Lösenordet behöver innehålla: 4 tecken, stora och små bokstäver, minst en siffra och minst ett specialtecken (!.-)",
                type: "warning"
            });
        }
    };

    function validateEmail(text: string) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!text.match(pattern)) {
            showMessage({
                message: "Icke giltig Email-adress",
                description: "Skriv in en giltig email",
                type: "warning"
            });
        }
    }

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>{title}</Text>
            <Text style={Typography.label}>E-post</Text>
            <TextInput
                style={Forms.logIn}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, email: content })
                    if (title === "Registrera") {
                        validateEmail(content);
                    }
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={Typography.label}>Lösenord</Text>
            <TextInput
                style={Forms.logIn}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, password: content })
                    if (title === "Registrera") {
                        validatePassword(content);
                    }
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
            />
            <Button
                title={title}
                onPress={() => {
                    submit();
                }}
            />
            {title === "Logga in" &&
                <Button
                    title="Registrera istället"
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                />
            }
        </View>
    );
};