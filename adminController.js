const db = require('../config/db');
exports.viewAppointments = async (req, res) => {
    try {
        const [appointments] = await db.query('SELECT * FROM Appointments');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
