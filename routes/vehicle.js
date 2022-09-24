const { Router } = require("express");
const router = Router();
const vehicleController = require('../controllers/vehicle');

router.delete('/:customerId/:vehicleId',vehicleController.deleteVehicle);

module.exports = router;