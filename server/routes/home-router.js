const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Server is ready and runnig on port 5000");
})

module.exports = router
