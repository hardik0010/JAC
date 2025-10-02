const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Testing MongoDB connection...');
console.log('MongoDB URI exists:', !!MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });


