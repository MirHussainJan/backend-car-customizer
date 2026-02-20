import { Request, Response } from 'express';
import { Vehicle } from '../models';
import { validationResult } from 'express-validator';

// Get all vehicles
export const getAllVehicles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { brandId } = req.query;
    const filter = brandId ? { brandId } : {};

    const vehicles = await Vehicle.find(filter)
      .populate('brandId', 'name logo')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: vehicles.length,
      data: vehicles,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vehicles',
      error: error.message,
    });
  }
};

// Get single vehicle by ID
export const getVehicleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate('brandId', 'name logo description');

    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      });
      return;
    }

    res.json({
      success: true,
      data: vehicle,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vehicle',
      error: error.message,
    });
  }
};

// Create new vehicle
export const createVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    const vehicle = await Vehicle.create(req.body);
    await vehicle.populate('brandId', 'name logo');

    res.status(201).json({
      success: true,
      message: 'Vehicle created successfully',
      data: vehicle,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error creating vehicle',
      error: error.message,
    });
  }
};

// Update vehicle
export const updateVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('brandId', 'name logo');

    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Vehicle updated successfully',
      data: vehicle,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error updating vehicle',
      error: error.message,
    });
  }
};

// Delete vehicle
export const deleteVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Vehicle deleted successfully',
      data: vehicle,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error deleting vehicle',
      error: error.message,
    });
  }
};

// Upload vehicle model (GLB file)
export const uploadVehicleModel = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
      return;
    }

    // Check if running in serverless environment
    const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NODE_ENV === 'production';

    if (isServerless) {
      // In serverless, files are in memory (req.file.buffer)
      // For production, integrate cloud storage (AWS S3, Cloudinary, Vercel Blob, etc.)
      res.status(501).json({
        success: false,
        message: 'File uploads require cloud storage integration in production environment',
        info: 'Please integrate AWS S3, Cloudinary, or Vercel Blob for file storage',
        file: {
          originalName: req.file.originalname,
          size: req.file.size,
          mimetype: req.file.mimetype,
        },
      });
      return;
    }

    // Local development - file saved to disk
    const modelUrl = `/models/${req.file.filename}`;

    res.json({
      success: true,
      message: 'Model uploaded successfully',
      data: {
        filename: req.file.filename,
        modelUrl,
        size: req.file.size,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error uploading model',
      error: error.message,
    });
  }
};
