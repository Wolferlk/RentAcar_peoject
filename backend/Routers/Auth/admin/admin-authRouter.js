const express = require('express');
const router = express.Router();

const { addSuperAdmin, loginSuperAdmin, logoutSuperAdmin } = require('../../../controllers/Auth/admin/admin-authController');
const verifyToken = require('../../../middleware/Auth/verifyToken');
const {isSuperAdmin}  = require('../../../middleware/Auth/authorization');

// Route to add new Super Admin (protected by secret key)
router.post('/add', addSuperAdmin);

// Super Admin login
router.post('/login', loginSuperAdmin);

// Super Admin logout
router.post('/logout', logoutSuperAdmin);

//Protected Super Admin route 
router.get('/owners/pending', verifyToken, isSuperAdmin, (req, res) => {
    res.json({ message: 'Only Super Admin can access this route' });
});

module.exports = router;
