import { Request, Response } from 'express';
import { Brand } from '../models';
import { validationResult } from 'express-validator';

// Get all brands
export const getAllBrands = async (req: Request, res: Response): Promise<void> => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: brands.length,
      data: brands,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching brands',
      error: error.message,
    });
  }
};

// Get single brand by ID
export const getBrandById = async (req: Request, res: Response): Promise<void> => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      res.status(404).json({
        success: false,
        message: 'Brand not found',
      });
      return;
    }

    res.json({
      success: true,
      data: brand,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching brand',
      error: error.message,
    });
  }
};

// Create new brand
export const createBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    const brand = await Brand.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Brand created successfully',
      data: brand,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: 'Brand with this name already exists',
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Error creating brand',
      error: error.message,
    });
  }
};

// Update brand
export const updateBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!brand) {
      res.status(404).json({
        success: false,
        message: 'Brand not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Brand updated successfully',
      data: brand,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error updating brand',
      error: error.message,
    });
  }
};

// Delete brand
export const deleteBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);

    if (!brand) {
      res.status(404).json({
        success: false,
        message: 'Brand not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Brand deleted successfully',
      data: brand,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error deleting brand',
      error: error.message,
    });
  }
};
