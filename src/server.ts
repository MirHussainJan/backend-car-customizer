import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/database';
import routes from './routes';
import { errorHandler, notFound } from './middleware';

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(compression()); // Compress responses
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Serve static files (uploaded models) from Frontend/public/models with proper headers
app.use('/models', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'model/gltf-binary');
  next();
}, express.static(path.join(__dirname, '../../Frontend/public/models')));

// API Routes
app.use('/api', routes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Car Customization Platform API',
    version: '1.0.0',
    endpoints: {
      brands: '/api/brands',
      vehicles: '/api/vehicles',
      assets: '/api/assets',
      analytics: '/api/analytics',
      health: '/api/health',
    },
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║   🚗 Car Customization Platform API        ║
║   ✅ Server running on port ${PORT}           ║
║   🌐 Environment: ${process.env.NODE_ENV || 'development'}              ║
╚══════════════════════════════════════════════╝
  `);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
});

export default app;
