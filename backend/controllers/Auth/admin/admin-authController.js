const User = require('../../../Models/userModel');
const { hashPassword, checkPassword } = require('../../../utils/bcryptUtil');

const { createToken } = require('../../../Utils/jwtUtil');




// Signup   Direct Regiter
async function addSuperAdmin(req, res) {
    try {
        const { email, password, firstName, lastName, secretKey } = req.body;

        //  Security: require a secret key to create a super admin
        if (secretKey !== process.env.SUPER_ADMIN_SECRET) {
            return res.status(403).json({ message: 'Unauthorized to create Super Admin' });
        }

        if (!email || !password || !firstName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if a super admin already exists with this email
        const existUser = await User.findOne({ email, userRole: 'super admin' });
        if (existUser) {
            return res.status(409).json({ message: 'Super Admin with this email already exists' });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create Super Admin user
        const newAdmin = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            userRole: 'super-admin',
            status: 'approved'
        });

        // Create JWT token
        const payload = {
            id: newAdmin._id.toString(),
            email: newAdmin.email,
            userRole: newAdmin.userRole
        };

        const token = createToken(payload);

        res.status(201)
            .cookie('SuperAdminToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 1000 * 60 * 60 * 24 * 5 // 5 days
            })
            .json({ message: 'Super Admin created successfully', userRole: newAdmin.userRole });

    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}


async function loginSuperAdmin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email or Password cannot be empty" });
    }

    try {
        const existUser = await User.findOne({ email , userRole: 'super admin'});

        if (!existUser) {
            return res.status(400).json({ message: "Invalid Email or Not a Super Admin" });
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

        // Always use 'superadmintoken' for super admin
        res.cookie('superadmintoken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 1000 * 60 * 60 * 24 * 5, // 5 days
        });

        return res.status(200).json({ message: "Super Admin Login Successful", userRole: existUser.userRole,token });

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Invalid Email format" });
        }
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

// Super Admin Logout
async function logoutSuperAdmin(req, res) {
    res.clearCookie('superadmintoken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
    return res.status(200).json({ message: 'Super Admin logout successful' });
}





module.exports = { addSuperAdmin, loginSuperAdmin, logoutSuperAdmin }