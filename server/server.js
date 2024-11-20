// npm run dev
// start MySQL server: sudo /usr/local/mysql/support-files/mysql.server start
// log in to MySQL: mysql -u root -p

require('dotenv').config(); //load environment variables for SECRET_KEY in loginController.js
//debug .env variable loading SECRET_KEY
console.log('SECRET_KEY:', process.env.SECRET_KEY);

const mysql = require('mysql2/promise'); 
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
const reportRoutes = require('./routes/reportRoutes');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}); 

// Example route to test the connection to loginDatabase
app.get('/test', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

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
app.use('/api/reports/',reportRoutes);

app.listen(5001, () => {
    console.log("Server started on port 5001")
} )// backend is gonna run on port 5001

module.exports = app;