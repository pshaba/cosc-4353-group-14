const express = require('express');
const router = express.Router();
const VolunteerParticipationController = require('../controllers/VolunteerParticipationController');

router.post('/', VolunteerParticipationController.createParticipation);
router.get('/', VolunteerParticipationController.getAllParticipationRecords);
router.get('/user/:id', VolunteerParticipationController.getParticipationByUserId);
router.put('/:id', VolunteerParticipationController.updateParticipation);
router.delete('/:id', VolunteerParticipationController.deleteParticipation);

module.exports = router;
