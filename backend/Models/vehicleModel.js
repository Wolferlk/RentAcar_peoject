const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({

    isAvailable: {   // its Rented or available for rent
        type: Boolean,
        required: true,
        default: true
        // true : available for rent, 
        // false : Already rented  (taken by a customer)
        // if vehicle finished its rented perioud or check available vehicles, only this field will be use or update
    },
    vehicleName: {
        type: String,
        required: true
    },
    vehicleLicenseNumber: {
        type: String,
        required: true,
        unique: true,
        // from this can check if vehicle is alreadt exist 
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    NoSeats: {
        type: String,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    mileage: {
        type: String,
    },
    isDriverAvailable: {
        type: Boolean,
        default:false
    },
    pricePerDay: {
        type: Number,
        required: true

    },
    pricePerDistance: {
        type: Number,
        required: true
    },
    Location: {
        type: String,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
    },
    pickupAddress: {
        type: String,
        required: true
    },

})


const Vehicle = mongoose.model('vehicle', vehicleSchema);
module.exports = Vehicle;