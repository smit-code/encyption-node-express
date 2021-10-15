const express = require("express");

const router = express.Router();

const vehicleControllers = require("../controllers/vehicle");

router.post("/", vehicleControllers.postData);

module.exports = router;
