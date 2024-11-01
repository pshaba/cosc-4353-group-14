const express = require('express');
const notificationRoutes = require('./routes/notificationRoutes');
const volunteerMatchingRoutes = require('./routes/volunteerMatchingRoutes');
const volunteerParticipationRoutes = require('./routes/volunteerParticipationRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Define routes
app.use('/api/notifications', notificationRoutes);
app.use('/api/volunteers', volunteerMatchingRoutes);
app.use('/api/volunteer-participation', volunteerParticipationRoutes);

// Export the app for testing purposes
module.exports = app;

// Start the server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}
