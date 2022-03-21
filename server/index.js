import express from "express";

const app = express();
const port = 3000;
const PUBLISHABLE_KEY = "pk_test_51KfgTHAQ3zNjgkbhEWYrh5pPLBOqBsam8oXohpSaJWMz7gF3G5CsSm7Xzx8hb76anlKpx9bkVPgrqU7qccEZ3Ftc00MU9cbFQE"
const SECRET_KEY = "sk_test_51KfgTHAQ3zNjgkbhl0PeRQLgIJaheKZd1pBlaKz7iTX0nzM2E9DRJNf4CT7Uy753bxFBHhE436MRg2pkIpZwrTfY00gS22AZDG"

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});