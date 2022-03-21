import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StripeApp from "./src/StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
    return (
        <StripeProvider publishableKey="pk_test_51KfgTHAQ3zNjgkbhEWYrh5pPLBOqBsam8oXohpSaJWMz7gF3G5CsSm7Xzx8hb76anlKpx9bkVPgrqU7qccEZ3Ftc00MU9cbFQE">
            <StripeApp />
        </StripeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

