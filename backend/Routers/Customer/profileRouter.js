const express = require('express');
const router = express.Router();
const { verifyCustomerToken } = require('../../middleware/Auth/verifyToken');
const profileController = require('../../controllers/Customer/profileController');


router.get('/', verifyCustomerToken, profileController.getProfile);
router.put('/', verifyCustomerToken, profileController.updateProfile);
router.delete('/', verifyCustomerToken, profileController.deleteProfile);

module.exports = router;