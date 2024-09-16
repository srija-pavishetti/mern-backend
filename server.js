const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db"); // Ensure this path is correct
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors()); // Apply CORS globally

// Connect to MongoDB
connectDB().then(() => {
    // Only start the server if the database connection is successful
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    // Handle connection errors and exit process if connection fails
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
});

// Routes
app.use('/api/items', require("./routes/items"));
app.use('/api/payment', require("./routes/payment"));
