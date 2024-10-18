// server.js
const express = require('express');
const notificationRoutes = require('./routes/NotificationRoutes');
const volunteerMatchingRoutes = require('./routes/VolunteerMatchingRoutes');

const app = express();
app.use(express.json());  // Middleware for parsing JSON bodies

// Base route for health check
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Use the routes
app.use('/api/notifications', notificationRoutes);
app.use('/api/matching', volunteerMatchingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

