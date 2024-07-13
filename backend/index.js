const express = require('express');
const userRoute = require('./routes/user');
const connectDB = require('./dbservice');
const cors = require('cors');

const app =express()

const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(cors());

app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}` );
});
