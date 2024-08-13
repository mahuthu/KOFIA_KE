const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); //import stripe and use the secret key
const { v4: uuidv4 } = require("uuid"); //import uuid
const Order = require("../models/Order"); //import the order model
const cart = require("../models/Cart"); //import the cart model


router.post("/payment", async (req, res) => { //create a post request to the payment route
    stripe.charges.create({ //create a stripe charge
        source: req.body.tokenId, //get the token id from the request
        amount: req.body.amount, //get the amount from the request
        currency: "usd", //set the currency to usd
    }, 

    (stripeErr, stripeRes) => { //create a callback function
        if(stripeErr){ //if there is an error
            res.status(500).json(stripeErr); //send the error
        } else { //if there is no error
            const order = new Order({ //create a new order
                userId: req.body.userId, //get the user id from the request
                products: req.body.products, //get the products from the request
                amount: req.body.amount, //get the amount from the request
                address: req.body.address, //get the address from the request
            });

            order.save(); //save the order to the database
            res.status(200).json(stripeRes); //send the stripe response
        }
    });
});

modules.export = router; //export the router