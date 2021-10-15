const express = require("express");

const router = express.Router();

const vehicleControllers = require("../controllers/vehicle");

router.post("/encrypt", vehicleControllers.postEncrypt);
router.post("/decrypt", vehicleControllers.postDecrypt);

module.exports = router;
