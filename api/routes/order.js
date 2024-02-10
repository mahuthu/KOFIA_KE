const  router = require("express").Router();
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = 
require("./verifyToken");


//create
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch(err){
        res.status(500).json(err);
    }
});

//update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }, {new: true});
    res.status(200).json(updatedOrder);
}
);

//delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    } catch(err){
        res.status(500).json(err);
    }
});


//get user order
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try{
        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json(orders);
    } catch(err){
        res.status(500).json(err);
    }
});

//get all orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch(err){
        res.status(500).json(err);
    }
}
);

//get monthly income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); //get the last month
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1)); //get the previous month

    try{
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } }, //match the orders that are created after the previous month
            { $project: { month: { $month: "$createdAt" }, sales: "$amount" } }, //project the month and the sales. $month is a date operator. it returns the month of the date
            { $group: { _id: "$month", total: { $sum: "$sales" } } }, //group by month and sum the sales
        ]);
        res.status(200).json(income);
    } catch(err){
        res.status(500).json(err);
    }
});



module.exports = router;


