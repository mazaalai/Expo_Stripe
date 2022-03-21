import React, {useState} from "react";
import {View, TextInput, StyleSheet,Text} from "react-native";

const StripeApp = (props) => {
    const[email, setEmail] = useState();
return (
    <View style={styles.container}>
        <TextInput
            autoCapitalize="none"
            placeholder="E-mail"
            keyboardType="email-address"
            onChange={value => setEmail(value.nativeEvent.text)}
            style={styles.input}
        />
    <Text>
        Stripe App
    </Text>
    </View>
);
}
export default StripeApp;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: "#efefefef",

        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,
    },
});