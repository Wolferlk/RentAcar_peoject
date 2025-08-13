const User = require('../../../Models/superAdminModel');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { hashPassword, checkPassword } = require('../../../utils/bcryptUtil');
const { createToken,createRefreshToken } = require('../../../utils/jwtUtil');
const { isSuperAdmin ,isSuperAdminUser } = require('../../../middleware/auth/authorization');



// Add Super Admin
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

        const existUser = await User.findOne({ email});//, userRole: 'super-admin' });
        if (existUser && isSuperAdminUser(existUser)) {
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
            .cookie(process.env.SUPERADMIN_COOKIE_NAME, token, {   // ✅ unified cookie name
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
        const existUser = await User.findOne({ email});//, userRole: 'super-admin' });
        if (!existUser || !isSuperAdminUser(existUser) ) {
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
            .cookie(process.env.SUPERADMIN_COOKIE_NAME, accessToken, { httpOnly: true })
            .cookie(process.env.SUPERADMIN_REFRESH_COOKIE_NAME, refreshToken, { httpOnly: true })
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
    res.clearCookie(process.env.SUPERADMIN_COOKIE_NAME, {   // ✅ unified cookie name
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
    return res.status(200).json({ message: 'Super Admin logout successful' });
}

//forgotten password

const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        const admin = await User.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        admin.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        admin.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
        await admin.save();

        // Send email
        const resetUrl = `http://localhost:5000/api/superadmin/reset-password/${resetToken}`;
        const message = `You requested a password reset. Click the link to reset your password: ${resetUrl}`;

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASSWORD
            },
        });

        await transporter.sendMail({
            to: admin.email,
            subject: 'Password Reset Request',
            text: message,
        });

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error requesting password reset', error: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const admin = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }, // Check if token is still valid
        });

        if (!admin) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Reset password
        admin.password = await hashPassword(newPassword);
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpires = undefined;
        await admin.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
};

module.exports = { addSuperAdmin, loginSuperAdmin, logoutSuperAdmin, requestPasswordReset, resetPassword };
