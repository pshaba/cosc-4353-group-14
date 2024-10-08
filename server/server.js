// npm run dev
require('dotenv').config(); //load environment variables for SECRET_KEY in loginController.js
//debug .env variable loading SECRET_KEY
console.log('SECRET_KEY:', process.env.SECRET_KEY);

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express() 

// Import routes
const profileRouter = require('./routes/profile-router');
const homeRouter = require('./routes/home-router');
const eventRoutes = require('./routes/events');
const volunteerHistoryRoutes = require('./routes/volunteerHistory');
const loginAuthRoutes = require('./routes/loginAuthRoutes'); 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))

// Use routes
app.use('/', homeRouter);
app.use('/profile', profileRouter);
app.use('/api/events', eventRoutes);
app.use('/api/volunteer-history', volunteerHistoryRoutes);
app.use('/api/auth', loginAuthRoutes); 

app.listen(5001, () => {
    console.log("Server started on port 5001")
} )// backend is gonna run on port 5001

module.exports = app;