// server.js

const express = require('express');
const notificationRoutes = require('./routes/notificationRoutes');
const volunteerMatchingRoutes = require('./routes/volunteerMatchingRoutes');

const app = express();

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

// Start server on port 5000
app.listen(5000, () => {
    console.log("Server started on port 5000");
});
