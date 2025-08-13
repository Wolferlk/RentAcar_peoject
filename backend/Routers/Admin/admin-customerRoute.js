const express = require('express');
const router = express.Router();
const { getAllCustomers, countCustomers } = require('../../controllers/Admin/admin-customerController');
const { verifySuperAdminToken } = require('../../middleware/Auth/verifyToken');
const { isSuperAdmin } = require('../../middleware/Auth/authorization');


router.get('/customers', verifySuperAdminToken, isSuperAdmin, getAllCustomers);
router.get('/customers/count', verifySuperAdminToken, isSuperAdmin, countCustomers);


module.exports = router;