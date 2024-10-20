const express = require('express');
const { addDoctor, listDoctors, updateDoctor, deleteDoctor } = require('../controllers/doctorController');

const router = express.Router();

router.post('/', addDoctor);
router.get('/', listDoctors);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);

module.exports = router;
