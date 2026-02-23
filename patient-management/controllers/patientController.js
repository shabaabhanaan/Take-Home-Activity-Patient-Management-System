const Patient = require("../models/Patient");

// Add Patient
exports.addPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json({ message: "Patient added successfully", patient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Address
exports.updateAddress = async (req, res) => {
    try {
        const patient = await Patient.findOne({ patientId: req.params.id });

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        patient.address = req.body.address;
        await patient.save();

        res.status(200).json({ message: "Address updated successfully", patient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};