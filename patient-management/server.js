require("dotenv").config(); // MUST be first line

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');

const Patient = require('./models/Patient');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected successfully!"))
.catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);

// Cron Job - Every January 1st
cron.schedule("0 0 1 1 *", async () => {
    try {
        await Patient.updateMany({}, { $inc: { age: 1 } });
        console.log("Patient ages updated successfully!");
    } catch (err) {
        console.error("Error updating patient ages:", err);
    }
});

// Port setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});