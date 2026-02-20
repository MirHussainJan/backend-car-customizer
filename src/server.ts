import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import routes from './routes';
import { errorHandler, notFound } from './middleware';

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();

// Connect to MongoDB (for serverless, connection is cached)
connectDB();

// Middleware
app.use(helmet()); // Security headers

// CORS configuration for production and development
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Allow any Vercel preview deployment
    if (origin.includes('.vercel.app')) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all in production for now
    }
  },
  credentials: true,
}));
app.use(compression()); // Compress responses
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Note: Static file serving removed for serverless deployment
// Models should be served directly from Frontend/public or CDN

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

// Start server (only for local development)
if (process.env.NODE_ENV !== 'production') {
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
}

// Export for Vercel serverless
export default app;
