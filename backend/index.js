const express = require('express');
const userRoute = require('./routes/user');
const investmentRoute = require('./routes/invest');
const interestRoute = require('./routes/interest');
const passwordRoute = require('./routes/password');
const connectDB = require('./dbservice');

const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://treasury-tracker-frontend.vercel.app/'],
  credentials: true,  // Allow credentials (cookies, auth headers)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

const PORT = process.env.PORT || 5000;

try {
  connectDB();

  app.use(express.json());

  app.use('/user', userRoute);
  app.use('/investment', investmentRoute);
  app.use('/interest', interestRoute);
  app.use('/password', passwordRoute);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
} catch (error) {
  console.error(error);
}

// General error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if no statusCode is set
  const message = err.message || "An unexpected error occurred";
  res.status(statusCode).json({
    message: message,
  });
});
