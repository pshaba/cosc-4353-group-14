
// server/controllers/loginController.js
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/loginUserModel'); 

//string used for signing and verifiying JSON web tokens
//when you generate a JWT, use the SECRET_KEY to create a signature for token
//when server recieves a JWT, it uses the same key to verify token's authentication 
//loaded from environment variables
const SECRET_KEY=process.env.SECRET_KEY; 

//function to validate email format 
const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //simple regex for email validation
    return regex.test(email); 
}; 

//register a new user
exports.register = async (req, res) => {
    const {email, password} = req.body; 

    //validate email format 
    if(!isValidEmail(email)) {
        return res.status(400).json({message: "Invalid email format. Try again."}); 
    }

    //check if user already exists 
    const existingUser = User.findUser(email); 
    if (existingUser) {
        console.log("User already exists", email); 
        return res.status(400).json({message: "User already exists" }); 
    }

    //hash the pasword
    const hashedPassword = await bcrypt.hash(password, 10); 

    //add user to the in-memory storage
    User.addUser({email, password: hashedPassword}); 

    res.status(201).json({message: 'User registered successfully'}); 
}; 

//login an existing user 
exports.login = async (req, res) => {
    const {email, password} = req.body; 

    //log login attempt for debugging
    console.log('Login attempt:', {email, password}); 

    //validate email format
    if(!isValidEmail(email)) {
        console.log('Invalid email format', email); 
        return res.status(400).json({message:"Invalid email format. Try again."}); 
    }

    //find user
    const user = User.findUser(email); 
    //check if user exists
    if (!user) {
        console.log('Email not found', email); 
        return res.status(401).json({message: "Email not found."}); 
    }

    //compare the provided password with the stored password
    const isPasswordMatch = await bcrypt.compare(password, user.password); 
    if (!isPasswordMatch) {
        console.log('Password does not match'); 
        return res.status(401).json({message: "Password not correct."}); 
    }

    //generate a JWT token 
    const token = jwt.sign({email: user.email}, SECRET_KEY, {expiresIn: '1h'}); 
    
    //check if user profile is complete to know whether to redirect to Profile or Home page
    const profileComplete = User.isProfileComplete(email); 

    //respond with token
    res.json({token, profileComplete}); 
}; 


