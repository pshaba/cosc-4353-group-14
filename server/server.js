// npm run dev

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

// Import routes
const profileRouter = require('./routes/profile-router');
const homeRouter = require('./routes/home-router');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))

// Use routes
app.use('/', homeRouter)
app.use('/profile', profileRouter) 

app.listen(5000, () => {
    console.log("Server started on port 5000")
} )// backend is gonna run on port 5000

