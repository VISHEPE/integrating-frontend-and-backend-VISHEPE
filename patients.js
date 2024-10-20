const express = require('express');
const { registerPatient, loginPatient, updateProfile, deleteAccount } = require('../controllers/patientController');
const { authenticateJWT } = require('../middleware/auth');

const router = express.Router();


router.post('/register', registerPatient);
router.post('/login', loginPatient);
router.put('/profile', authenticateJWT, updateProfile);
router.delete('/account', authenticateJWT, deleteAccount);

module.exports = router;
