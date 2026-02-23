const mongoose = require('mongoose');   

const appointmentSchema = new mongoose.Schema({
    appointmentId: {
        type: String,
        required: true,
        unique: true
    },
    patientId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Active","Cancelled"],
        default: "Active"
    }
}); 

module.exports = mongoose.model('Appointment', appointmentSchema);