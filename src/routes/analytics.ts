import express from 'express';
import { getDashboardMetrics, getAnalytics } from '../controllers';
import { protect, authorize } from '../middleware';

const router = express.Router();

/**
 * @route   GET /api/analytics/metrics
 * @desc    Get dashboard metrics
 * @access  Private (Admin)
 */
router.get('/metrics', protect, authorize('admin'), getDashboardMetrics);

/**
 * @route   GET /api/analytics
 * @desc    Get analytics data
 * @access  Private (Admin)
 */
router.get('/', protect, authorize('admin'), getAnalytics);

export default router;
