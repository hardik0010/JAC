const path = require('path');
const dotenv = require('dotenv');
const envConfig = require('./config/env');

// Load environment variables from env.js as defaults
Object.keys(envConfig).forEach(key => {
    if (!process.env[key]) {
        process.env[key] = envConfig[key];
    }
});

// Load environment variables
const envPath = path.resolve(__dirname, '.env');
console.log('Loading .env file from:', envPath);

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('Error loading .env file:', result.error);
  process.exit(1);
}

console.log('Environment variables loaded. Current values:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Present (length: ' + process.env.MONGODB_URI.length + ')' : 'Not found');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || 'Not found');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Present' : 'Not found');

// Verify required environment variables
const requiredEnvVars = ['MONGODB_URI', 'CLOUDINARY_CLOUD_NAME', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(env => !process.env[env]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  process.exit(1);
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const winston = require('winston');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Debug environment variables
console.log('=== ENVIRONMENT DEBUG ===');
console.log('Current working directory:', process.cwd());
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'NOT SET');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
console.log('========================');

const connectDB = require('./config/db');

// Import routes
const projectRoutes = require('./routes/projects');
const galleryRoutes = require('./routes/gallery');
const serviceRoutes = require('./routes/services');
const teamRoutes = require('./routes/team');
const adminRoutes = require('./routes/admin');

const app = express();

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());

// Rate limiting - more lenient for development
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // Increased limit for development
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Enable compression
app.use(compression());

// CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', process.env.FRONTEND_URL || 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));

// Handle preflight requests
app.options('*', cors());

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0',
    uptime: process.uptime()
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    endpoints: {
      projects: '/api/projects',
      gallery: '/api/gallery',
      services: '/api/services',
      team: '/api/team',
      admin: '/api/admin'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query
  });

  // Don't expose error details in production
  const errorMessage = process.env.NODE_ENV === 'production' 
    ? 'An error occurred' 
    : err.message || 'Something went wrong!';

  res.status(err.status || 500).json({ 
    success: false,
    message: errorMessage
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

// Try to start server with fallback ports if main port is in use
const startServer = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log('MongoDB Connected successfully');
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying ${port + 1}`);
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
      }
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

startServer(PORT);
