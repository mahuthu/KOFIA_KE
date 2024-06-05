const axios = require("axios");
const { saveTransaction } = require("../models/database");
const Order = require("../models/Order");

let token; // Ensure token is accessible across functions

// Middleware to create token
const createToken = async (req, res, next) => {
  try {
    const secret = process.env.CONSUMER_SECRET;
    const consumer = process.env.CONSUMER_KEY;
    const auth = Buffer.from(`${consumer}:${secret}`).toString("base64");

    const response = await axios.get(
      "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { authorization: `Basic ${auth}` } }
    );

    token = response.data.access_token;
    console.log("Token:", response.data);
    next();
  } catch (err) {
    console.error("TOKEN GENERATION ERROR:", err.message);
    res.status(400).json({ error: "TOKEN GENERATION ERROR", message: err.message });
  }
};

// STK push
const postStk = async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const shortCode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    const password = Buffer.from(shortCode + passkey + timestamp).toString("base64");

    const data = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: shortCode,
      PhoneNumber: phone,
      CallBackURL: "http://localhost:5000/api/authentication/callback", // Update to use your local or production callback URL
      AccountReference: "purchase",
      TransactionDesc: "purchase",
    };

    const response = await axios.post(
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      data,
      { headers: { authorization: `Bearer ${token}` } }
    );

    if (response.data.ResponseCode === "0") {
      res.status(200).json(response.data);
    } else {
      res.status(400).json(response.data);
    }
  } catch (err) {
    console.error("STK PUSH ERROR:", err.message);
    res.status(422).json({ error: "STK PUSH ERROR", message: err.message });
  }
};

// Callback function
const callback = async (req, res) => {
  const data = req.body.Body.stkCallback;

  try {
    const transaction = {
      MerchantRequestID: data.MerchantRequestID,
      CheckoutRequestID: data.CheckoutRequestID,
      ResultCode: data.ResultCode,
      ResultDesc: data.ResultDesc,
      Amount: data.CallbackMetadata?.Item[0]?.Value,
      MpesaReceiptNumber: data.CallbackMetadata?.Item[1]?.Value,
      Balance: data.CallbackMetadata?.Item[2]?.Value,
      TransactionDate: data.CallbackMetadata?.Item[3]?.Value,
      PhoneNumber: data.CallbackMetadata?.Item[4]?.Value,
    };

    const savedTransaction = await saveTransaction(transaction);
    console.log("SAVED TRANSACTION", savedTransaction);

    res.status(200).json({ message: "Callback received successfully", data: savedTransaction });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to save the transaction data" });
  }
};

module.exports = { createToken, postStk, callback };
