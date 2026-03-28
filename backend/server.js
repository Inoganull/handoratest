const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/productRoutes');

const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/products', productRoutes);

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the Handora API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is successfully running on port: ${PORT}`);
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
server.timeout = 300000; // Set timeout to 5 minutes (300000 ms)
