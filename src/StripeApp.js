import React, {useState} from "react";
import {View, TextInput, StyleSheet, Text, Button} from "react-native";
import {CardField, useConfirmPayment} from "@stripe/stripe-react-native";

const API_URL = "http://192.168.56.1:3000";

const StripeApp = (props) => {
    const[email, setEmail] = useState();
    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment, loading } = useConfirmPayment();

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { clientSecret, error } = await response.json();
        return { clientSecret, error };
    };

    const handlePayPress = async () => {
        //1.Verzamel de factureringsgegevens van de klant (bijv. e-mail)
        if (!cardDetails?.complete || !email) {
            Alert.alert("Voer a.u.b. volledige kaartgegevens en e-mail in");
            return;
        }
        const billingDetails = {
            email: email,
        };
        //2.Haal het intent client geheim op van de backend
        try {
            const { clientSecret, error } = await fetchPaymentIntentClientSecret();
            //2. De betaling bevestigen
            if (error) {
                console.log("Kan betaling niet verwerken");
            } else {
                const { paymentIntent, error } = await confirmPayment(clientSecret, {
                    type: "Card",
                    billingDetails: billingDetails,
                });
                if (error) {
                    alert(`Fout in de betalingsbevestiging ${error.message}`);
                } else if (paymentIntent) {
                    alert("Betaling geslaagd");
                    console.log("Succesvolle betaling ", paymentIntent);
                }
            }
        } catch (e) {
            console.log(e);
        }
        //3.Bevestig de betaling met de kaartgegevens
    };

return (
    <View style={styles.container}>

        <TextInput
            autoCapitalize="none"
            placeholder="E-mail"
            keyboardType="email-address"
            onChange={value => setEmail(value.nativeEvent.text)}
            style={styles.input}
        />
        <CardField
            postalCodeEnabled={true}
            placeholder={{
                number: "4242 4242 4242 4242",
            }}
            cardStyle={styles.card}
            style={styles.cardContainer}
            onCardChange={cardDetails => {
                setCardDetails(cardDetails);
            }}
        />
        <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
);
}
export default StripeApp;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 20,
    },
    input: {
        backgroundColor: "#efefefef",

        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,
    },
    card: {
        backgroundColor: "#efefefef",
    },
    cardContainer: {
        height: 50,
        marginVertical: 30,
    },
});