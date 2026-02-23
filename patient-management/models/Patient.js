const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientId:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    NIC: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    previousCaseHistory:{
        type: String,
    }
});

module.exports = mongoose.model('Patient', patientSchema);