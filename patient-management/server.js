const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const Patient = require('./models/Patient');

const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected successfully!"))
.catch((err) => console.log("MongoDB connection error: ", err));

app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);

cron.schedule("0 0 1 1 *", async () => {
    try{
        const patients = await Patient.find();
        for(let patient of patients){
            patient.age += 1;
            await patient.save();
        }
        console.log("Patient ages updated successfully!");
    }catch(err){
        console.error("Error updating patient ages: ", err);
    }
});

app.listen(5000, () => 
{
    console.log("Server is running on port 5000");
});
