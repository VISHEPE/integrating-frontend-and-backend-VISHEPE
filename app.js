const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();

const app = express();  // Initialize app here, before using it
app.use(bodyParser.urlencoded({ extended: true })); // For form submissions
app.use(cookieParser());



app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');
const adminRoutes = require('./routes/admin');


// Landing page route
// Landing page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the index.html file
});

// Backend API routes
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);  
app.use('/admin', adminRoutes);  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
