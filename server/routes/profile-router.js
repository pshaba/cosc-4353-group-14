const express = require('express')
const router = express.Router()
const { getProfile, createProfile } = require('../controllers/profileController');

router.post('/', createProfile);
router.get('/', getProfile)


module.exports = router;
