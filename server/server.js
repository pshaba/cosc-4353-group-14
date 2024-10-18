// server.js

const express = require('express');
const notificationRoutes = require('./routes/notificationRoutes');
const volunteerMatchingRoutes = require('./routes/volunteerMatchingRoutes');

const app = express();
const PORT = process.env.PORT || 5000; // Make port configurable

// Middleware to parse JSON
app.use(express.json());

// Base route to check if the server is ready
app.get("/", (req, res) => {
    res.send("Server is ready");
});

// Temporary route for fetching users array (can be replaced later)
app.get("/api", (req, res) => {
    res.json({"users": ["UserOne", "UserTwo", "UserThree"]});
});

// Use notification and volunteer matching routes
app.use('/api/notifications', notificationRoutes);
app.use('/api/matching', volunteerMatchingRoutes);

// 404 Error handler for unknown routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
