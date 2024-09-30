
// server/routes/loginAuthRoutes/js
const express = require('express'); 
const router = express.Router(); 
//const loginController = require('../controllers/loginController'); 
const { register, login } = require('../src/controllers/loginController');

//registration route
router.post('/register', register); //loginController.register 

//login route
router.post('/login', login); //loginController.login 

module.exports = router; 

