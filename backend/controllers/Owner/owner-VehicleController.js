const Vehicle = require("../../Models/vehicleModel");

async function registerVehicle(req, res) {
    try {
        const {vehicleName, vehicleLicenseNumber, brand, model, year, vehicleType, description, noSeats, fuelType, transmission, mileage, isDriverAvailable, pricePerDay, pricePerDistance, location, phoneNumber, email, pickupAddress} = req.body;

        if (!vehicleName || !vehicleLicenseNumber || !brand || !model || !year || !vehicleType || !noSeats || !fuelType || !transmission || !pricePerDay || !pricePerDistance || !phoneNumber || !pickupAddress) {
            return res.status(400).json({
                message: 'All the required fields must be filled.'
            });
        }

        // Check if vehicle with the same license number already exists
        const existingVehicle = await Vehicle.findOne({ vehicleLicenseNumber });
        if (existingVehicle) {
            return res.status(409).json({
                message: 'A vehicle with the same license number already exists.'
            });
        }

        // Onwer id
        const ownerId = req?.user.id;
        files = req.files || []
        const imagePaths = files.map(file => `/uploads/vehicles/${file.filename}`);

        await Vehicle.create({
            vehicleName, 
            vehicleLicenseNumber, 
            brand, 
            model, 
            year, 
            vehicleType, 
            description, 
            noSeats, 
            fuelType, 
            transmission, 
            mileage, 
            isDriverAvailable, 
            pricePerDay, 
            pricePerDistance, 
            location, 
            phoneNumber, 
            email, 
            pickupAddress,
            images: imagePaths,
            owner: ownerId //owner reference
        });

        return res.status(201).json({
            message: 'Vehicle Created Successfully! Pending Approval.'
        })

    } catch(error) {
        console.error('Error registering vehicle:', error);
        // further checking for duplicates from db level
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'A vehicle with this license number already exists.'
            })
        }
        return res.status(500).json({
            message: 'Failed to register vehicle',
            error: error.message
        })
    }
}

async function getVehicle(req, res) {
    try{
        const vehicleId = req.params.id;
        const ownerId = req.user.id;

        // Check if vehicle exists
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({
                message: 'No vehicle found.'
            });
        }

        // Check vehicle belongs to the logged in user
        if (vehicle.owner.toString() !== ownerId){
            return res.status(403).json({
                message: 'You don\'t have permission for others\' vehicles.'
            });
        }

        return res.status(200).json({
            message: 'Vehicle returned successfully.',
            data: vehicle
        });
    } catch (error) {
        console.error('Error getting vehicle:', error);
        return res.status(500).json({
            message: 'Failed to get vehicle',
            error: error.message
        });
    }
}

async function getAllVehiclesByOwnerId(req, res) {
    try {
        const ownerId = req.user.id;

        const ownersVehicles = await Vehicle.find({ owner: ownerId });

        return res.status(200).json({
            message: 'All the vehicles for the owner returned as a list.',
            data: ownersVehicles
        })
    } catch (error) {
        console.error('Error getting vehicles for the owner: ', error);
        return res.status(500).json({
            message: 'Failed to get the vehicles',
            error: error.message
        });
    }
}

async function updateVehicle(req, res) {
    try {
        const vehicleId = req.params.id;
        const ownerId = req.user.id;

        // Check if vehicle exists
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({
                message: 'No vehicle found.'
            });
        }

        // Check vehicle belongs to the logged in user
        if (vehicle.owner.toString() !== ownerId){
            return res.status(403).json({
                message: 'You don\'t have permission to update others\' vehicles.'
            });
        }

        if (!vehicle.isApproved) {
            return res.status(403).json({
                message: 'Your vehicle registration is still pending for approval.'
            })
        }

        const {vehicleName, brand, model, year, vehicleType, description, noSeats, fuelType, transmission, mileage, isDriverAvailable, pricePerDay, pricePerDistance, location, phoneNumber, email, pickupAddress} = req.body;

        const files = req.files || [];
        const newImagePaths = files.map(file => `/uploads/vehicles/${file.filename}`);

        let updatedImages = vehicle.images || [];
        if (newImagePaths.length > 0) {
            updatedImages = [...updatedImages, ...newImagePaths];
        }

        await Vehicle.updateOne( 
            {_id: vehicleId}, 
            {$set: {
                vehicleName, brand, model, year, vehicleType, description, noSeats, fuelType, transmission, mileage, isDriverAvailable, pricePerDay, pricePerDistance, location, phoneNumber, email, pickupAddress,
                images: updatedImages
            }}
        );
        return res.status(200).json({
            message: 'Vehicle updated successfully.'
        })
    } catch (error) {
        console.error('Error updating vehicle:', error);
        return res.status(500).json({
            message: 'Failed to update vehicle',
            error: error.message
        });
    }
}

async function deleteVehicle(req, res) {
    try {
        const vehicleId = req.params.id;
        const ownerId = req.user.id;

        // Check if vehicle exists
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({
                message: 'No vehicle found'
            });
        }

        // Check vehicle belongs to the logged in user
        if (vehicle.owner.toString() !== ownerId){
            return res.status(403).json({
                message: 'You don\'t have permission to delete others\' vehicles.'
            });
        }

        if (!vehicle.isApproved) {
            return res.status(403).json({
                message: 'Your vehicle registration is still pending for approval.'
            })
        }
        
        await Vehicle.findByIdAndDelete(vehicleId)

        return res.status(200).json({
            message: 'Vehicle successfully deleted.'
        });
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        return res.status(500).json({
            message: 'Failed to delete vehicle',
            error: error.message
        });
    }
}

module.exports = {
    registerVehicle, getVehicle, getAllVehiclesByOwnerId, updateVehicle, deleteVehicle
};