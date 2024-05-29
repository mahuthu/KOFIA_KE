const express = require('express');
const mongoose = require('mongoose');
const app = express()
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const { errorHandler } = require('./middlewares/errorHandler');

//const userRoute = require('./routes/user');



const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const authentication = require('./routes/authentication');






mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log
("connected")} )
.catch(()=>{console.log("error")
}
)


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/auth", authentication);
app.use(errorHandler);








app.listen(process.env.PORT || 5000, () => {
    console.log(`listening on port ${process.env.PORT || 5000}!`)});