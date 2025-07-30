const User = require('../../../Models/userModel');
const { hashPassword, checkPassword } = require('../../../utils/bcryptUtil');

const { createToken } = require('../../../Utils/jwtUtil');

// Direct Registration For Owner
async function registerOwner(req, res) {
    try {
        const { email, password, firstName, lastName } = req.body;

        // Check if required fields are not empty
        if (!email || !password || !firstName) {
            return res.status(400).json({ message: 'Email, Passowrd and FirstName Fields are Required' });
        }

        // Check user already exsist with this email first
        const isUserExsist = await User.findOne({ email });
        if (isUserExsist) {
            return res.status(409).json({ message: "User Email Already Exsist" });
        }

        // Hash Password
        const hashedPassword = await hashPassword(password);

        // Add new owner user to the database
        const newUser = await User.create({ 
            email, 
            password: hashedPassword, 
            firstName, 
            lastName,
            userRole: 'owner' 
        });

        if (newUser) {
            const payload = {
                id: newUser._id.toString(),
                email: newUser.email,
                userRole: newUser.userRole
            }

            const token = createToken(payload);

            if (!token) {
                return res.status(500).json({ message: 'Token Not Generated' });
            }

            // sending success Response
            const cookieName = process.env.OWNER_COOKIE_NAME;
            return res.status(200).cookie(cookieName, token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'Strict', 
                maxAge: 1000 * 60 * 60 * 24 * 5 
            }).json({ message: "User Registration Successfull" });
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

async function loginOwner(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email or Password cannot be empty" });
    }

    try {
        const existUser = await User.findOne({ email });

        if (!existUser) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        if (existUser.userRole !== 'owner') {
            return res.status(403).json({ message: "Access denied. This login is for car owners only." });
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

        const token = createToken(payload);

        // Choose cookie name based on role
        const cookieName = process.env.OWNER_COOKIE_NAME;

        res.cookie(cookieName, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
        });

        return res.status(200).json({ message: "Login Successful", userRole: existUser.userRole });

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Invalid Email format" });
        }
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

async function logoutOwner(req, res) {
    res.clearCookie(process.env.OWNER_COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });

    return res.status(200).json({ message: 'Logout successful' });
}

module.exports = { registerOwner, loginOwner, logoutOwner }