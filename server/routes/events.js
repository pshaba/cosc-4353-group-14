const express = require('express');
const router = express.Router();
const {
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const eventDetailsModel = require('../models/eventDetailsModel'); // Adjust the path as necessary

// Define a route to fetch events
router.get('/', eventDetailsModel.getEvents);
router.post('/', createEvent);
// router.get('/', getEvents);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
