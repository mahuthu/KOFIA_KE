const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const { errorHandler } = require('./middlewares/errorHandler');

// Route imports
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const authentication = require('./routes/authentication');
const searchRoutes = require('./routes/searchRoutes');


// Define allowed origins
const allowedOrigins = [
  'http://localhost:5000',   // Local frontend (React)
  'http://34.111.185.192',   // Ingress IP
  'http://localhost:3000',   // Local frontend (React)
  'http://localhost:3001'    // Local dashboard
  ];

// CORS configuration with dynamic origin handling
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if the request origin is in the allowedOrigins list
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy does not allow access from this origin.';
      return callback(new Error(msg), false);
    }

    // Allow the request if the origin is in the allowed list
    return callback(null, true);
  },
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials like cookies or auth headers
  optionsSuccessStatus: 200
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// Middleware setup
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes setup
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/authentication", authentication);
app.use("/api/search", searchRoutes);

// Error handling middleware
app.use(errorHandler);

// Health check route
app.get('/api/', (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT || 5000}!`);
});
