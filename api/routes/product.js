const router = require('express').Router();
const Product = require("../models/Product")
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin
} = require("./verifyToken");


//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch(err){
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new: true});
        res.status(200).json(updatedProduct);
    } catch(err){
        res.status(500).json(err);
    }
});

//delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch(err){
        res.status(500).json(err);
    }

});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch(err){
        res.status(500).json(err);
    }
});



//GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const qNew = req.query.new; // ?new=true. If we want to get the latest product. 
    const qCategory = req.query.category; // ?category=fruits. If we want to get products by category
    try{
        let products;
        if(qNew){ //if qNew is true, get the latest product
            products = await Product.find().sort({createdAt: -1}).limit(1); //sort by createdAt in descending order. limit to 1
        } else if(qCategory){    //if qCategory is true, get products by category
            products = await Product.find({       //find products by category
                categories: {
                    $in: [qCategory], //find products that have the category. $in is a mongoDB operator. it is used to find products that have the category
                },
            });
      
        } else {
            products = await Product.find(); //if qNew and qCategory are false, get all products
        }
        res.status(200).json(products);
    } catch(err){
        res.status(500).json(err);
    }
}
);

//






module.exports = router;