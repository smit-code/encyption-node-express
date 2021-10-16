const express = require("express");
const router = express.Router();

// Controllers Calling
const vehicleControllers = require("../controllers/vehicle");

// Encrypt Route
router.post("/encrypt", vehicleControllers.postEncrypt);
// Decrypt Route
router.post("/decrypt", vehicleControllers.postDecrypt);

// Final Route
router.post("/", vehicleControllers.postDecrypt);

module.exports = router;
