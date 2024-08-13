const router = require('express').Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const { request } = require('express');
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
    const {firstName, lastName, username, email, password, phoneNumber } = req.body;

    // Validate input
    if ( !firstName || !lastName || !username || !email || !password || !phoneNumber) {
        return res.status(400).json("Please fill in all fields");
    }
    if (password.length < 6) {
        return res.status(400).json("Password must be at least 6 characters long");
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
        return res.status(400).json("Invalid phone number. It must be a 10-digit number.");
    }

    // Create new user
    const newUser = new User({
        username,
        email,
        password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
        phoneNumber,
        firstName,
        lastName
    });

    try {
        console.log("Request Body:", req.body);
        const user = await newUser.save();
        console.log("User Saved:", user);
        return res.status(200).json(user);
    } catch (err) {
        console.error("Error during registration:", err);
        return res.status(500).json(err);
    }
});


// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).json("Wrong Username");
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(401).json("Wrong Password");
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "1d" }
        );

        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, accessToken });

    } catch (err) {
        return res.status(500).json(err);
    }
});

// REFRESH TOKEN
router.post('/refresh', async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.status(401).json("No refresh token provided");

    jwt.verify(refreshToken, process.env.JWT_SEC, (err, user) => {
        if (err) return res.status(403).json("Invalid refresh token");

        const newAccessToken = jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "15m" } // Access token expiration
        );

        res.status(200).json({ accessToken: newAccessToken });
    });
});
router.post('/logout', async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json("No refresh token provided");
  
    try {
      // Add the refresh token to blacklist
      await TokenBlacklist.add(refreshToken); // Example of adding to a blacklist
      res.status(200).json("Logged out successfully");
    } catch (err) {
      console.error("Error during logout:", err);
      res.status(500).json("Internal server error");
    }
  });

module.exports = router;
