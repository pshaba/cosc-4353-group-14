
// npm run dev

require('dotenv').config(); //load environment variablies from .env file for SECRET KEY on loginController.js
console.log('SECRET_KEY:', process.env.SECRET_KEY); //log to check if it's loaded

const express = require('express')
const cors = require('cors') 
const loginAuthRoutes = require('./routes/loginAuthRoutes'); 

const app = express()  

app.use(cors()); 
app.use(express.json()); //parse JSON bodies

//Use authentication routes
app.use('/api/auth', loginAuthRoutes); 

app.get("/", (req, res) => {
    res.send("Server is ready");
})

app.listen(5000, () => {
    console.log("Server started on port 5000");
});// backend is gonna run on port 5000

// app.get("/api", (req, res) => {
//     res.json({"users": ["USerOne", "userTwo", "userThree"]}) //temp users array that will be fetched and displayed on the front end
// })

