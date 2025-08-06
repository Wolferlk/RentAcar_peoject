const ownerVehicleController = require('../../controllers/Owner/owner-VehicleController');
const { verifyOwnerToken } = require('../../middleware/Auth/verifyToken');

const router = require('express').Router();

// id should be the mongo id of the owner model
router.post('/register', verifyOwnerToken, ownerVehicleController.registerVehicle);
router.get('/all', verifyOwnerToken, ownerVehicleController.getAllVehiclesByOwnerId);
router.get('/:id', verifyOwnerToken, ownerVehicleController.getVehicle);
router.put('/:id', verifyOwnerToken, ownerVehicleController.updateVehicle);
router.delete('/:id', verifyOwnerToken, ownerVehicleController.deleteVehicle);

module.exports = router;