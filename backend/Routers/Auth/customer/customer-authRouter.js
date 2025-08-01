
const router = require('express').Router();
const passport = require('passport');
const customerAuthController = require('../../../controllers/Auth/customer/customer-authController');

// const {isSuperAdmin} = require('../../Middlewares/Auth/authorization')
// const {verifyAdminToken} = require('../../Middlewares/Auth/verifyToken');


router.route('/register').post(customerAuthController.addUser);


router.route('/login').post(customerAuthController.loginUser);
router.route('/logout').post(customerAuthController.logoutUser);
router.route('/refresh').post(customerAuthController.refreshCustomerToken);

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    customerAuthController.googleLoginUser
);



module.exports = router