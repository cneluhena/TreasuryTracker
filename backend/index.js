const express = require('express');
const userRoute = require('./routes/user');
const investmentRoute = require('./routes/invest');
const interestRoute = require('./routes/interest');

const connectDB = require('./dbservice');

const cors = require('cors');
const cookieParser = require('cookie-parser');

const app =express()
app.use(cookieParser());
app.use(cors({origin: ['http://localhost:3000'],
    credentials: true}));
const PORT = process.env.PORT || 5000;


try{
    connectDB();
   

app.use(express.json());


app.use('/user', userRoute);
app.use('/investment', investmentRoute);
app.use('/interest', interestRoute);
app.use("/", (req, res) => {
    res.json({ "message": "Welcome to the Investment App" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}` );
});

} catch(error){
    console.error(error);
}
