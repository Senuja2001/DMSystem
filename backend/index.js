import express from 'express';
import { PORT, mongoDBURL } from './config.js'; // Assuming PORT and mongoDBURL are in a config file
import mongoose from 'mongoose';
import returnsRoute from './routes/returnsRoute.js'; // Updated to use the correct returns route
import cors from 'cors';

const app = express();

// Middleware for parsing JSON request body
app.use(express.json());

// Option 2: Allow custom origins with CORS
app.use(
    cors({
        origin: 'http://localhost:5173', // Correct origin for your React app
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

// Welcome route
app.get('/', (request, response) => {
    return response.status(200).send('Welcome to the Distribution Management System API');
});

// Use the returns route
app.use('/returns', returnsRoute); // Updated to use 'returnsRoute'

// MongoDB connection (Removed deprecated options)
mongoose
  .connect(mongoDBURL) 
  .then(() => {
      console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
      console.log('MongoDB connection error:', error);
  });

// Start the server
app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
});
