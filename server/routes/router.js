const express = require('express')
const router = express.Router()


router.post('/profile', (req, res) => {
    const { fullName, address1, address2, city, state, zipCode, skills, preferences, availability } = req.body

    console.log(fullName + ' | ' + skills)
    res.send('Profile Saved and Hello from Server ')
})
router.get('/', (req, res) => {
    res.send("Server is ready and runnig on port 5000");
})

module.exports = router
