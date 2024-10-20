const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registering
exports.registerPatient = async (req, res) => {
    try {
        const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;

        // validation
        if (!first_name || !last_name || !email || !password || !phone || !date_of_birth || !gender || !address) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            'INSERT INTO Patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [first_name, last_name, email, hashedPassword, phone, date_of_birth, gender, address]
        );
        res.status(201).json({ message: 'Patient registered successfully', patientId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Login patient
exports.loginPatient = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await db.query('SELECT * FROM Patients WHERE email = ?', [email]);
        const patient = rows[0];

        if (patient && await bcrypt.compare(password, patient.password_hash)) {
            const token = jwt.sign({ id: patient.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Profile mgtm
exports.updateProfile = async (req, res) => {
    const { id } = req.user; 
    const { phone, date_of_birth, gender, address } = req.body;

    try {
        await db.query('UPDATE Patients SET phone = ?, date_of_birth = ?, gender = ?, address = ? WHERE id = ?', 
            [phone, date_of_birth, gender, address, id]);
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete account
exports.deleteAccount = async (req, res) => {
    const { id } = req.user;

    try {
        await db.query('DELETE FROM Patients WHERE id = ?', [id]);
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
