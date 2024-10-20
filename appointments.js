const express = require('express');
const { bookAppointment, listAppointments, cancelAppointment } = require('../controllers/appointmentController');

const router = express.Router();

// Route to book  appointments
router.post('/', bookAppointment);

// Route  list appointments 
router.get('/', listAppointments);

// Route to cancel an appointment
router.put('/:id/cancel', cancelAppointment);

module.exports = router;
