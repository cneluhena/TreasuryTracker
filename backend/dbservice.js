const mongoose = require('mongoose');
const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to database');
    } catch (error) {
        console.log('Error connecting to database', error);
    }
}

module.exports = connectDB;