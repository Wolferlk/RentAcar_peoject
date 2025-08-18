const Booking = require("../../Models/bookingModel");

async function changeBookingStatus(req, res) {
    try{
        const {bookingId, bookingStatus} = req.params;

        // Owner can only make a booking confrimed or cancelled
        if (bookingStatus !== 'confirmed' && bookingStatus !== 'cancelled') {
            return res.status(400).json({
                message: 'Invalid booking status. Must be "confirmed" or "cancelled"'
            });
        }

        const booking = await Booking.findById(bookingId);
        
        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        // Check if booking is for the exact owner
        if (booking.owner.toString() !== req.user.id) {
            return res.status(409).json({
                message: 'Unauthorized: You can\'t manage others\' bookings.'
            });
        }

        // Owner can't change status if it's cancelled or completed. 
        if (booking.bookingStatus === 'cancelled' || booking.bookingStatus === 'completed') {
            return res.status(400).json({
                message: 'You can\'t change booking status after it\'s completed or cancelled.'
            })
        }

        booking.bookingStatus = bookingStatus;
        await booking.save();

        return res.status(200).json({
            message: `Booking ${booking.bookingStatus === 'confirmed' ? 'approved' : booking.bookingStatus} successfully.`
        });
    } catch (error) {
        console.log('Error changing booking status.', error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}

async function getAllBookings(req, res) {
    try{
        const ownerId = req.user.id;
        const bookings = await Booking.find({owner: ownerId })
        .populate('vehicle')
        .populate('customer', 'firstName lastName email phoneNumber');

        return res.status(200).json({
            message: 'All bookings successfull received.',
            bookings
        });
    } catch (error) {
        console.log('Error getting all bookings for owner.', error);
        return res.status(500).json({
            message: 'Server error.',
            error: error.message
        });
    }
}

// To get booking requests
async function getPendingBookings(req, res) {
    try{
        const ownerId = req.user.id;
        const bookings = await Booking.find({
            owner: ownerId,
            bookingStatus: 'pending'
        }).populate('vehicle')
        .populate('customer', 'firstName lastName email phoneNumber');

        return res.status(200).json({
            message: 'All pending bookings successfull received.',
            bookings
        });

    } catch (error) {
        console.log('Error getting pending bookings for owner.', error);
        return res.status(500).json({
            message: 'Server error.',
            error: error.message
        });
    }
}

module.exports = {
    changeBookingStatus,
    getAllBookings,
    getPendingBookings
}