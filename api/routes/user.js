
const User = require("../models/User");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin
} = require("./verifyToken");
const router = require('express').Router();
const CryptoJS = require("crypto-js");

//update

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if(req.user.password){req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
    ).toString();}
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}

        );
        const { password, ...others } = updatedUser._doc;

        res.status(200).json(updatedUser);
        }
        catch(err){
            res.status(500).json(err);
        }
         
}
);

//delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch(err){
        res.status(500).json(err);
    }
}
);

//get user

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, ...info} = user._doc;  // info is the user object without the password. user doc is the user object
        res.status(200).json(info);
    } catch(err){
        res.status(500).json(err);
    }
}
);

//get all users
router.get("/", verifyTokenAndAdmin, async (req, res) => { 
    const query = req.query.new; //new is a query parameter. it is a boolean . if true, it will return the latest users
    try{
        const users = query //if query is true, return the latest users
        ? await User.find().sort({_id: -1}).limit(5) //sort by id in descending order. limit to 5
        : await User.find();
        res.status(200).json(users);
    } catch(err){
        res.status(500).json(err);
    }
}
);

//Get user stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });
// router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
//     const date = new Date(); //current date
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));//last year same date
//     try{
//         const data = await User.aggregate([ //aggregate is a method in mongoose
//             {
//                 $project: { //project is a method in aggregate
//                     month: {$month: "$createdAt"},//extract month from createdAt
//                 },
//             },
//             {
//                 $group: { //group is a method in aggregate
//                     _id: "$month",//group by month
//                     total: {$sum: 1},//count the number of users in each month
//                 },
//             },
//         ]);
//         res.status(200).json(data);
//     } catch(err){
//         res.status(500).json(err);
//     }
// });



module.exports = router;



// const router = require("express").Router();

// router.get("/usertest", (req, res) => {
//     res.send("hey its user");
//     });

// router.post("/userposttest", (req, res) => {
//     const username = req.body.username;
//     console.log(username);
//     res.send("your username is" + username)
//     }
// );




// module.exports = router;

