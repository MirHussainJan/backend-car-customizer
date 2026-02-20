import express from 'express';
import brandRoutes from './brands';
import vehicleRoutes from './vehicles';
import assetRoutes from './assets';
import analyticsRoutes from './analytics';
import authRoutes from './auth';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/brands', brandRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/assets', assetRoutes);
router.use('/analytics', analyticsRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
