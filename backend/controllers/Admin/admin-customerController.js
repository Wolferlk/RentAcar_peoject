const Customer = require('../../Models/customerModel');

// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers', error: error.message });
    }
};

// Count all customers
const countCustomers = async (req, res) => {
    try {
        const total = await Customer.countDocuments();
        res.status(200).json({ total });
    } catch (error) {
        res.status(500).json({ message: 'Error counting customers', error: error.message });
    }
};


module.exports = { getAllCustomers, countCustomers };