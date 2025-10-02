const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const config = {
  development: {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    jwtSecret: process.env.JWT_SECRET,
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET
    }
  },
  production: {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI,
    frontendUrl: process.env.FRONTEND_URL || 'https://jayambeconstruction.com',
    jwtSecret: process.env.JWT_SECRET,
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      apiSecret: process.env.CLOUDINARY_API_SECRET
    }
  }
};

const environment = process.env.NODE_ENV || 'development';
module.exports = config[environment];

