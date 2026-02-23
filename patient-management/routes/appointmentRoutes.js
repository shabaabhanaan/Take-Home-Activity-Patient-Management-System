const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.post("/", appointmentController.addAppointment);
router.get("/check", appointmentController.checkAvailability);
router.put("/:id/cancel", appointmentController.cancelAppointment);

module.exports = router;