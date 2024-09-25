const express = require('express');
const router = express.Router();
const {
  createVolunteerHistory,
  getVolunteerHistory,
} = require('../controllers/volunteerHistoryController');

router.post('/', createVolunteerHistory);
router.get('/', getVolunteerHistory);

module.exports = router;
