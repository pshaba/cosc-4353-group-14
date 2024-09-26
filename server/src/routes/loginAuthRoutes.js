
// server/routes/loginAuthRoutes/js
const express = require('express'); 
const router = express.Router(); 
const loginController = require('../controllers/loginController'); 

//registration route
router.post('/register', loginController.register); 

//login route
router.post('/login', loginController.login); 

module.exports = router; 

