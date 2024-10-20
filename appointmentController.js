const db = require('../config/db');

// Booking appoi
exports.bookAppointment = async (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;

    try {
        const [result] = await db.query('INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)', 
            [patient_id, doctor_id, appointment_date, appointment_time, 'scheduled']);
        res.status(201).json({ message: 'Appointment booked successfully', appointmentId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// List appoi
exports.listAppointments = async (req, res) => {
    const { patient_id } = req.query;

    try {
        const [appointments] = await db.query('SELECT * FROM Appointments WHERE patient_id = ?', [patient_id]);
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancel appoi
exports.cancelAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('UPDATE Appointments SET status = ? WHERE id = ?', ['canceled', id]);
        res.json({ message: 'Appointment canceled successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
