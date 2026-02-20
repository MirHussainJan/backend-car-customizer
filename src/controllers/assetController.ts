import { Request, Response } from 'express';
import { CustomizationAsset } from '../models';
import { validationResult } from 'express-validator';

// Get all customization assets
export const getAllAssets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const assets = await CustomizationAsset.find(filter)
      .populate('compatibility', 'name vehicleModel')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: assets.length,
      data: assets,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching assets',
      error: error.message,
    });
  }
};

// Get single asset by ID
export const getAssetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const asset = await CustomizationAsset.findById(req.params.id)
      .populate('compatibility', 'name vehicleModel thumbnail');

    if (!asset) {
      res.status(404).json({
        success: false,
        message: 'Asset not found',
      });
      return;
    }

    res.json({
      success: true,
      data: asset,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching asset',
      error: error.message,
    });
  }
};

// Create new asset
export const createAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    const asset = await CustomizationAsset.create(req.body);
    await asset.populate('compatibility', 'name vehicleModel');

    res.status(201).json({
      success: true,
      message: 'Asset created successfully',
      data: asset,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error creating asset',
      error: error.message,
    });
  }
};

// Update asset
export const updateAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array(),
      });
      return;
    }

    const asset = await CustomizationAsset.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('compatibility', 'name vehicleModel');

    if (!asset) {
      res.status(404).json({
        success: false,
        message: 'Asset not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Asset updated successfully',
      data: asset,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error updating asset',
      error: error.message,
    });
  }
};

// Delete asset
export const deleteAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const asset = await CustomizationAsset.findByIdAndDelete(req.params.id);

    if (!asset) {
      res.status(404).json({
        success: false,
        message: 'Asset not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Asset deleted successfully',
      data: asset,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error deleting asset',
      error: error.message,
    });
  }
};

// Get assets by category
export const getAssetsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.params;
    const validCategories = ['paint', 'wheels', 'interior', 'exterior', 'performance'];

    if (!validCategories.includes(category)) {
      res.status(400).json({
        success: false,
        message: 'Invalid category',
      });
      return;
    }

    const assets = await CustomizationAsset.find({ category })
      .populate('compatibility', 'name vehicleModel')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: assets.length,
      data: assets,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching assets by category',
      error: error.message,
    });
  }
};
