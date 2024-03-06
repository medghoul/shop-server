// Connect to mongodb using mongoose
const mongoose = require('mongoose');
const config = require('../config/config.json');

mongoose.Promise = global.Promise;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(config.mongo_configs.host);
        console.log('Successfully connected to MongoDB.');
    } catch (err) {
        console.error('Connection error:', err);
        process.exit(1); // Exit the process with an error code
    }
};
module.exports = {mongoose,connectToDatabase};
