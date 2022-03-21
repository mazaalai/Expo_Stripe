import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51KfgTHAQ3zNjgkbhEWYrh5pPLBOqBsam8oXohpSaJWMz7gF3G5CsSm7Xzx8hb76anlKpx9bkVPgrqU7qccEZ3Ftc00MU9cbFQE";
const SECRET_KEY = "sk_test_51KfgTHAQ3zNjgkbhl0PeRQLgIJaheKZd1pBlaKz7iTX0nzM2E9DRJNf4CT7Uy753bxFBHhE436MRg2pkIpZwrTfY00gS22AZDG";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1099, //lowest denomination of particular currency
            currency: "usd",
            payment_method_types: ["card"], //by default
        });

        const clientSecret = paymentIntent.client_secret;

        res.json({
            clientSecret: clientSecret,
        });
    } catch (e) {
        console.log(e.message);
        res.json({ error: e.message });
    }
});