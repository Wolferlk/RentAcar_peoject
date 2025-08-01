const jwt = require('jsonwebtoken');





function verifySuperAdminToken(req, res, next) {
    
    const tokenName = process.env.SUPERADMIN_COOKIE_NAME;
    const token = req.cookies[tokenName];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied.  Admin Privilages Required !' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // add decoded user data from token to request
        req.user = decoded;

        next();

    } catch (error) {
   
        return res.status(403).json({ message: 'Server Error', error:error.message  });
    }

}

function verifyCustomerToken(req, res, next) {
    const token = req.cookies[process.env.CUSTOMER_COOKIE_NAME];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. Customer Login Required!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Server Error', error: error.message });
    }
}

function verifyOwnerToken(req, res, next) {
    const tokenName = process.env.OWNER_COOKIE_NAME
    const token = req.cookies[tokenName];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No Owner Token found! Please log in.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // add decoded user data from token to request
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(403).json({ message: 'Server Error', error:error.message  });
    }

}

module.exports = {  verifySuperAdminToken, verifyOwnerToken, verifyCustomerToken };

