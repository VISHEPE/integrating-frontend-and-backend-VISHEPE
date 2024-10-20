const db = require('../config/db');

// Add new doctor
exports.addDoctor = async (req, res) => {
    const { first_name, last_name, specialization, email, phone, schedule } = req.body;

    try {
        const [result] = await db.query('INSERT INTO Doctors (first_name, last_name, specialization, email, phone, schedule) VALUES (?, ?, ?, ?, ?, ?)', 
            [first_name, last_name, specialization, email, phone, JSON.stringify(schedule)]);
        res.status(201).json({ message: 'Doctor added successfully', doctorId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// List doctors
exports.listDoctors = async (req, res) => {
    try {
        const [doctors] = await db.query('SELECT * FROM Doctors');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update doctor info
exports.updateDoctor = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, specialization, email, phone, schedule } = req.body;

    try {
        await db.query('UPDATE Doctors SET first_name = ?, last_name = ?, specialization = ?, email = ?, phone = ?, schedule = ? WHERE id = ?', 
            [first_name, last_name, specialization, email, phone, JSON.stringify(schedule), id]);
        res.json({ message: 'Doctor updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete doctor
exports.deleteDoctor = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM Doctors WHERE id = ?', [id]);
        res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
