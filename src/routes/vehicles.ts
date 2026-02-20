import express from 'express';
import {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  uploadVehicleModel,
} from '../controllers';
import { vehicleValidation } from '../validators';
import { upload } from '../config/multer';
import { protect, authorize } from '../middleware';

const router = express.Router();

/**
 * @route   GET /api/vehicles
 * @desc    Get all vehicles (optionally filter by brandId)
 * @access  Public
 */
router.get('/', getAllVehicles);

/**
 * @route   GET /api/vehicles/:id
 * @desc    Get vehicle by ID
 * @access  Public
 */
router.get('/:id', getVehicleById);

/**
 * @route   POST /api/vehicles
 * @desc    Create new vehicle
 * @access  Private (Admin)
 */
router.post('/', protect, authorize('admin'), vehicleValidation, createVehicle);

/**
 * @route   PUT /api/vehicles/:id
 * @desc    Update vehicle
 * @access  Private (Admin)
 */
router.put('/:id', protect, authorize('admin'), vehicleValidation, updateVehicle);

/**
 * @route   DELETE /api/vehicles/:id
 * @desc    Delete vehicle
 * @access  Private (Admin)
 */
router.delete('/:id', protect, authorize('admin'), deleteVehicle);

/**
 * @route   POST /api/vehicles/upload
 * @desc    Upload vehicle 3D model (.glb/.gltf)
 * @access  Private (Admin)
 */
router.post('/upload', protect, authorize('admin'), upload.single('model'), uploadVehicleModel);

export default router;
