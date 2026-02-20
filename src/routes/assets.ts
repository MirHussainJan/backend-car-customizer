import express from 'express';
import {
  getAllAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
  getAssetsByCategory,
} from '../controllers';
import { assetValidation } from '../validators';
import { protect, authorize } from '../middleware';

const router = express.Router();

/**
 * @route   GET /api/assets
 * @desc    Get all customization assets (optionally filter by category)
 * @access  Public
 */
router.get('/', getAllAssets);

/**
 * @route   GET /api/assets/category/:category
 * @desc    Get assets by category
 * @access  Public
 */
router.get('/category/:category', getAssetsByCategory);

/**
 * @route   GET /api/assets/:id
 * @desc    Get asset by ID
 * @access  Public
 */
router.get('/:id', getAssetById);

/**
 * @route   POST /api/assets
 * @desc    Create new customization asset
 * @access  Private (Admin)
 */
router.post('/', protect, authorize('admin'), assetValidation, createAsset);

/**
 * @route   PUT /api/assets/:id
 * @desc    Update customization asset
 * @access  Private (Admin)
 */
router.put('/:id', protect, authorize('admin'), assetValidation, updateAsset);

/**
 * @route   DELETE /api/assets/:id
 * @desc    Delete customization asset
 * @access  Private (Admin)
 */
router.delete('/:id', protect, authorize('admin'), deleteAsset);

export default router;
