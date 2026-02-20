import { Request, Response, NextFunction } from 'express';
import { connectDB } from '../config/database';

// Middleware to ensure database connection before handling requests
export const ensureDBConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await connectDB();
    next();
  } catch (error: any) {
    console.error('Database connection error:', error);
    res.status(503).json({
      success: false,
      message: 'Database connection error',
      error: error.message,
    });
  }
};
