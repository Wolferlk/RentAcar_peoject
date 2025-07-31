const User = require('../../../Models/superAdminModel');
const { hashPassword, checkPassword } = require('../../../utils/bcryptUtil');
const { createToken,createRefreshToken } = require('../../../utils/jwtUtil');

// Add Super Admin
async function addSuperAdmin(req, res) {
    try {
        const { email, password, firstName, lastName, secretKey } = req.body;
          console.log('Env SUPER_ADMIN_SECRET:', process.env.SUPER_ADMIN_SECRET);
        console.log('Received secretKey:', secretKey);

        //  Security: require a secret key to create a super admin

        if (secretKey !== process.env.SUPER_ADMIN_SECRET) {
            return res.status(403).json({ message: 'Unauthorized to create Super Admin' });
        }

        if (!email || !password || !firstName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existUser = await User.findOne({ email, userRole: 'super-admin' });
        if (existUser) {
            return res.status(409).json({ message: 'Super Admin with this email already exists' });
        }

        const hashedPassword = await hashPassword(password);

        const newAdmin = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            userRole: 'super-admin',
            status: 'approved'
        });

        const payload = {
            id: newAdmin._id.toString(),
            email: newAdmin.email,
            userRole: newAdmin.userRole
        };

        const token = createToken(payload);

        res.status(201)
            .cookie('superadmintoken', token, {   // ✅ unified cookie name
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 1000 * 60 * 60 * 24 * 5
            })
            .json({ message: 'Super Admin created successfully', userRole: newAdmin.userRole });

    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}


// Login Super Admin
async function loginSuperAdmin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email or Password cannot be empty" });
    }

    try {
        const existUser = await User.findOne({ email, userRole: 'super-admin' });
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

        const accessToken = createToken(payload);
        const refreshToken = createRefreshToken(payload);

        res
            .cookie('superadmintoken', accessToken, { httpOnly: true })
            .cookie('superadminrefreshtoken', refreshToken, { httpOnly: true })
            .status(200)
            .json({
                message: "Super Admin Login Successful",
                userRole: existUser.userRole,
                accessToken,
                refreshToken
            });

    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
}


// Logout Super Admin
async function logoutSuperAdmin(req, res) {
    res.clearCookie('superadmintoken', {   // ✅ unified cookie name
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
    return res.status(200).json({ message: 'Super Admin logout successful' });
}

module.exports = { addSuperAdmin, loginSuperAdmin, logoutSuperAdmin };
