const router = require('express').Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
    if (req.body.username === "" || req.body.email === "" || req.body.password === "") {
        return res.status(400).json("Please fill in all fields");
    } else if (req.body.password.length < 6) {
        return res.status(400).json("Password must be at least 6 characters long");
    } else {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        });
        try {
            const user = await newUser.save();
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
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
