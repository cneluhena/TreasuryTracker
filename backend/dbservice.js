const mongoose = require('mongoose');
const path = require('path');
const userSchema = require('./models/__user');
const investmentSchema = require('./models/investment');
const interestSchema = require('./models/interests');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to Database')
    } catch (error) {
        console.log('Error connecting to database', error);
    }
}

// const connectInterestDB = async () => {
//     try {
//         const interestDB =  await mongoose.createConnection(process.env.DB_INTEREST_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
 
//         console.log('Connected to Interest database');
//         return interestDB;
//     } catch (error) {
//         console.log('Error connecting to database', error);
//     }
// }

module.exports = connectDB;