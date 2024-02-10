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


mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log
("connected")} )
.catch(()=>{console.log("error")
}
)


app.use(express.json());
app.use("/api/auth/", authRoute);
app.use("/api/user/", userRoute);
app.use("/api/product/", productRoute);
app.use(("/api/cart/", cartRoute));




app.listen(process.env.PORT || 5000, () => {
    console.log(`Example app listening on port ${process.env.PORT || 5000}!`)});