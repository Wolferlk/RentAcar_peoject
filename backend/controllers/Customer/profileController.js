const Customer = require('../../Models/customerModel');

exports.getProfile = async (req, res) => {
    try {
        const custoemer = await Customer.findById(req.user.id);
        if (!custoemer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({
            success: true,
            data: custoemer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, email, photo, image, phoneNumber, dateOfBirth, driversLicense, emergencyContact, address } = req.body;

        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.user.id,
            { 
                $set: {
                    firstName,
                    lastName,
                    email,
                    photo,
                    image,
                    phoneNumber,
                    dateOfBirth,
                    driversLicense,
                    emergencyContact,
                    address
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({
            success: true,
            data: updatedCustomer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

exports.deleteProfile = async (req, res) => {
    try {

        await Customer.findByIdAndUpdate(req.user.id, { refreshToken: null });

        const deletedCustomer = await Customer.findByIdAndDelete(req.user.id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Clear the correct cookies with proper options
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        };

        // Clear both access and refresh tokens
        res.clearCookie(process.env.CUSTOMER_COOKIE_NAME, cookieOptions);
        res.clearCookie(process.env.CUSTOMER_REFRESH_COOKIE_NAME, cookieOptions);

        res.status(200).json({
            success: true,
            message: 'Profile deleted successfully',
            data: deletedCustomer
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}