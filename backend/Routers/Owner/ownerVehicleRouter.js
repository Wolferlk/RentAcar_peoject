const ownerVehicleController = require('../../controllers/Owner/owner-VehicleController');
const { verifyOwnerToken } = require('../../middleware/Auth/verifyToken');
const upload = require('../../utils/multer');

const router = require('express').Router();

// id should be the mongo id of the owner model
router.post('/register', verifyOwnerToken, upload.array('vehicleImages', 5), ownerVehicleController.registerVehicle);
router.get('/all', verifyOwnerToken, ownerVehicleController.getAllVehiclesByOwnerId);
router.get('/:id', verifyOwnerToken, ownerVehicleController.getVehicle);
router.put('/:id', verifyOwnerToken, upload.array('vehicleImages', 5), ownerVehicleController.updateVehicle);
router.delete('/:id', verifyOwnerToken, ownerVehicleController.deleteVehicle);
router.delete('/:id/images/:imageId', verifyOwnerToken, ownerVehicleController.deleteVehicleImage);

module.exports = router;