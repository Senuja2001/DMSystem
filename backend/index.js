import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (request, response) => {
    return response.status(234).send('Welcome To MERN Stack Tutorial');
});

// Use the books route
app.use('/books', booksRoute);

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
