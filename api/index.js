const express = require('express');
const mongoose = require('mongoose');
const app = express()
const dotenv = require('dotenv');
dotenv.config();
//const userRoute = require('./routes/user');



const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const cors = require("cors");




mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log
("connected")} )
.catch(()=>{console.log("error")
}
)


app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);






app.listen(process.env.PORT || 5000, () => {
    console.log(`listening on port ${process.env.PORT || 5000}!`)});