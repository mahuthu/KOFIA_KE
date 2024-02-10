const router = require('express').Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken");


//REGISTER

router.post("/register", async(req,res) => {

    if (req.body.username === "" || req.body.email === "" || req.body.password === "") {
        res.status(400).json("Please fill in all fields");
    } else if (req.body.password.length < 6) {
        res.status(400).json("Password must be at least 6 characters long");
    } else {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password:  CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        });
        try {
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
        
        
        }
    
});


//login
router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );

        !user && res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

            
        originalPassword !== req.body.password && 
            res.status(401).json("Wrong Password");

        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
  
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;


// router.post("/login", async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.body.email });
        
//         // Check if user exists
//         if (!user) {
//             return res.status(401).json("Wrong email or password");
//         }

//         const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
//         const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        
//         // Check if password matches
//         if (originalPassword !== req.body.password) {
//             return res.status(401).json("Wrong email or password");
//         }

//         // If authentication successful, send user info
//         const { password, ...info } = user._doc;
//         res.status(200).json(info);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });