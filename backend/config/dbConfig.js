const mongoose = require('mongoose');

async function connectDatabase(URI) {


   await mongoose.connect(URI).then(() => console.log("MongoDB Connected.")).catch(() => console.log("Database Not Connected."));

}

module.exports = connectDatabase;