import express from 'express';
import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from '../controllers';
import { brandValidation } from '../validators';
import { protect, authorize } from '../middleware';

const router = express.Router();

/**
 * @route   GET /api/brands
 * @desc    Get all brands
 * @access  Public
 */
router.get('/', getAllBrands);

/**
 * @route   GET /api/brands/:id
 * @desc    Get brand by ID
 * @access  Public
 */
router.get('/:id', getBrandById);

/**
 * @route   POST /api/brands
 * @desc    Create new brand
 * @access  Private (Admin)
 */
router.post('/', protect, authorize('admin'), brandValidation, createBrand);

/**
 * @route   PUT /api/brands/:id
 * @desc    Update brand
 * @access  Private (Admin)
 */
router.put('/:id', protect, authorize('admin'), brandValidation, updateBrand);

/**
 * @route   DELETE /api/brands/:id
 * @desc    Delete brand
 * @access  Private (Admin)
 */
router.delete('/:id', protect, authorize('admin'), deleteBrand);

export default router;
