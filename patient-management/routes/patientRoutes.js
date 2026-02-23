const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

router.post("/", patientController.addPatient);
router.put("/:id/address", patientController.updateAddress);

module.exports = router;