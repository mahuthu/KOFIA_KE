const router = require('express').Router();
const Product = require('../models/Product');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin
} = require("./verifyToken");

router.get('/', async (req, res) => {
  try {
    const { term } = req.query;
    const regex = new RegExp(term, 'i');

    const products = await Product.find({
      $or: [
        { title: regex },
        { description: regex },
        { category: regex }
      ]
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error searching products', error: error.message });
  }
});

module.exports = router;
