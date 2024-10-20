const express = require('express');
const { viewAppointments } = require('../controllers/adminController');

const router = express.Router();

router.get('/appointments', viewAppointments);

module.exports = router;
