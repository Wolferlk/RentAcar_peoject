const User = require('../../../Models/customerModel');
const { hashPassword, checkPassword } = require('../../../utils/bcryptUtil');
const { createToken, createRefreshToken, verifyRefreshToken } = require('../../../Utils/jwtUtil');


//Note: this is for to understand and make neccessory changes in this


// Signup   Direct Regiter
async function addUser(req, res) {


    try {
        const { email, password, firstName, lastName } = req.body;

        if (!email || !password || !firstName) {
            return res.status(400).json({ message: 'All Fields Required' });
        }

        const isUserExsist = await User.findOne({ email });
        if (isUserExsist) {
            return res.status(409).json({ message: "User Email Already Exsist" });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({ email, password: hashedPassword, firstName, lastName });
        if (newUser) {
            const payload = {
                id: newUser._id.toString(),
                email: newUser.email,
                userRole: newUser.userRole
            };

            const accessToken = createToken(payload);
            const refreshToken = createRefreshToken(payload);

            // Store refresh token in database
            await User.findByIdAndUpdate(newUser._id, { refreshToken });

            if (!accessToken || !refreshToken) {
                return res.status(500).json({ message: 'Token Not Generated' });
            }

            const accessCookieName = process.env.CUSTOMER_COOKIE_NAME;
            const refreshCookieName = process.env.CUSTOMER_REFRESH_COOKIE_NAME;

            res.cookie(accessCookieName, accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 1000 * 60 * 15 // 15 minutes
            });

            res.cookie(refreshCookieName, refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
            });

            return res.status(200).json({
                message: "User Registration Successfull",
                userRole: newUser.userRole
            });
        }

    } catch (error) {

        if (error.code === 11000) {
            console.warn("Duplicate slipped through:", email);
            return res.status(409).json({ message: "User Email Already Exsist" });
        }

        // Email Validation
        if (error.name === "ValidationError") {

            return res.status(400).json({ message: "Invalid Email format" });
        }

        // Other Errors
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }

}


async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email or Password cannot be empty" });
    }

    try {
        const existUser = await User.findOne({ email });

        if (!existUser) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        const isPassMatch = await checkPassword(password, existUser.password);

        if (!isPassMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const payload = {
            id: existUser._id.toString(),
            email: existUser.email,
            userRole: existUser.userRole,
        };

        const accessToken = createToken(payload);
        const refreshToken = createRefreshToken(payload);

        // Store refresh token in database
        await User.findByIdAndUpdate(existUser._id, { refreshToken });

        // Choose cookie name based on role
        // Get cookie name from environment variable based on user role
        const accessCookieName = process.env.CUSTOMER_COOKIE_NAME;
        const refreshCookieName = process.env.CUSTOMER_REFRESH_COOKIE_NAME;

        res.cookie(accessCookieName, accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 15, // 15 minutes
        });

        res.cookie(refreshCookieName, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        });

        return res.status(200).json({ message: "Login Successful", userRole: existUser.userRole });

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Invalid Email format" });
        }
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

async function refreshCustomerToken(req, res) {
    try {
        const refreshCookieName = process.env.CUSTOMER_REFRESH_COOKIE_NAME;
        const refreshToken = req.cookies[refreshCookieName];

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token not found' });
        }

        // Verify the refresh token
        const decoded = verifyRefreshToken(refreshToken);
        if (!decoded || decoded.type !== 'refresh') {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Verify user exists and token matches
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Create new tokens
        const payload = {
            id: user._id.toString(),
            email: user.email,
            userRole: user.userRole
        };

        const newAccessToken = createToken(payload);
        const newRefreshToken = createRefreshToken(payload);

        // Update refresh token in database
        await User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken });

        const accessCookieName = process.env.CUSTOMER_COOKIE_NAME;
        const newRefreshCookieName = process.env.CUSTOMER_REFRESH_COOKIE_NAME;

        res.cookie(accessCookieName, newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 15
        });

        res.cookie(newRefreshCookieName, newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        return res.status(200).json({ message: 'Token refreshed successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

async function logoutUser(req, res) {
    
    try {
        // Clear refresh token from database if user is authenticated
        if (req.user && req.user.id) {
            await User.findByIdAndUpdate(req.user.id, { refreshToken: null });
        }

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        };

        res.clearCookie(process.env.CUSTOMER_COOKIE_NAME, cookieOptions);
        res.clearCookie(process.env.CUSTOMER_REFRESH_COOKIE_NAME, cookieOptions);

        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}


async function findOrCreateGoogleUser(profile) {
    try {
        const existingUser = await User.findOne({
            $or: [
                { googleId: profile.id },
                { email: profile.emails?.[0]?.value }
            ]
        });

        if (existingUser) {
            return existingUser;
        }

        const newUser = await User.create({
            googleId: profile.id,
            firstName: profile.name.givenName || '',
            lastName: profile.name.familyName || '',
            email: profile.emails?.[0]?.value || '',
            photo: profile.photos[0]?.value || '',
            userRole: 'customer'
        });

        console.log('New Google user created:', newUser.email);
        return newUser;

    } catch (error) {
        throw error;
    }
}

async function googleLoginUser(req, res) {

    try {
        const payload = {
            id: req.user._id.toString(),
            googleId: req.user.googleId,
            email: req.user.email,
            userRole: req.user.userRole
        }

        const accessToken = createToken(payload);
        const refreshToken = createRefreshToken(payload);

        // Store refresh token in database
        await User.findByIdAndUpdate(req.user._id, { refreshToken });

        const accessCookieName = process.env.CUSTOMER_COOKIE_NAME;
        const refreshCookieName = process.env.CUSTOMER_REFRESH_COOKIE_NAME;

        res.cookie(accessCookieName, accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 15 // 15 minutes
        });

        res.cookie(refreshCookieName, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        });

        return res.redirect(process.env.CLIENT_URL);
    
    } catch (error) {

        // Email Validation
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Invalid Email format" });
        }
        // Other Errors
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }

}



module.exports = { addUser, loginUser, refreshCustomerToken, logoutUser, findOrCreateGoogleUser, googleLoginUser }