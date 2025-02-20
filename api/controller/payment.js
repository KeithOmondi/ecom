const express = require("express");
const axios = require("axios");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE;
const MPESA_PASSKEY = process.env.MPESA_PASSKEY;
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL;

// Function to get M-Pesa access token
const getMpesaToken = async () => {
    const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString("base64");

    try {
        const response = await axios.get(
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {
                headers: { Authorization: `Basic ${auth}` },
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error("M-Pesa Token Error:", error.response.data);
        throw new Error("Failed to get M-Pesa access token.");
    }
};

// M-Pesa STK Push Route
router.post(
    "/process",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { phone, amount } = req.body; // User's phone number & amount

            const accessToken = await getMpesaToken();
            const timestamp = new Date()
                .toISOString()
                .replace(/[-:TZ]/g, "")
                .slice(0, 14);

            const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString("base64");

            const stkPushData = {
                BusinessShortCode: MPESA_SHORTCODE,
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: amount,
                PartyA: phone,
                PartyB: MPESA_SHORTCODE,
                PhoneNumber: phone,
                CallBackURL: CALLBACK_URL,
                AccountReference: "Payment",
                TransactionDesc: "Payment for order",
            };

            const response = await axios.post(
                "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
                stkPushData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            res.status(200).json({
                success: true,
                message: "STK Push sent successfully. Please check your phone to complete the payment.",
                MerchantRequestID: response.data.MerchantRequestID,
                CheckoutRequestID: response.data.CheckoutRequestID,
            });
        } catch (error) {
            console.error("M-Pesa Payment Error:", error.response?.data || error.message);
            return next(new Error("M-Pesa Payment Failed"));
        }
    })
);

module.exports = router;
