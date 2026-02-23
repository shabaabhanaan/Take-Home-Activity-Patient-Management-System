const Appointment = require("../models/Appointment");

// Add Appointment
exports.addAppointment = async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json({ message: "Appointment created", appointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Check octor DAvailability
exports.checkAvailability = async (req, res) => {
    try {
        const { doctorName, date, time } = req.query;

        const appointment = await Appointment.findOne({
            doctorName,
            date: new Date(date),
            time,
            status: "Active"
        });

        if (appointment) {
            return res.status(200).json({
                available: false,
                message: "Doctor not available"
            });
        }

        res.status(200).json({
            available: true,
            message: "Doctor available"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancel Appointment
exports.cancelAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        appointment.status = "Cancelled";
        await appointment.save();

        res.status(200).json({
            message: "Appointment cancelled successfully",
            appointment
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};