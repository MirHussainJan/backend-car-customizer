import { Request, Response } from 'express';
import { Brand, Vehicle, CustomizationAsset } from '../models';

// Get dashboard metrics
export const getDashboardMetrics = async (req: Request, res: Response): Promise<void> => {
  try {
    const [totalBrands, totalVehicles, totalAssets] = await Promise.all([
      Brand.countDocuments(),
      Vehicle.countDocuments(),
      CustomizationAsset.countDocuments(),
    ]);

    // Calculate total revenue (sum of all vehicle prices)
    const vehiclesWithPrices = await Vehicle.find({}, 'basePrice');
    const totalRevenue = vehiclesWithPrices.reduce((sum, vehicle) => sum + vehicle.basePrice, 0);

    // Mock data for metrics that would require more complex tracking
    const monthlyGrowth = 12.5; // Percentage
    const customerSatisfaction = 4.8; // Out of 5

    res.json({
      success: true,
      data: {
        totalBrands,
        totalVehicles,
        totalAssets,
        totalRevenue,
        monthlyGrowth,
        customerSatisfaction,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard metrics',
      error: error.message,
    });
  }
};

// Get analytics data
export const getAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get vehicles by brand
    const vehiclesByBrand = await Vehicle.aggregate([
      {
        $group: {
          _id: '$brandId',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'brands',
          localField: '_id',
          foreignField: '_id',
          as: 'brand',
        },
      },
      {
        $unwind: '$brand',
      },
      {
        $project: {
          _id: 0,
          brandName: '$brand.name',
          count: 1,
        },
      },
    ]);

    // Get assets by category
    const assetsByCategory = await CustomizationAsset.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalValue: { $sum: '$price' },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          count: 1,
          totalValue: 1,
        },
      },
    ]);

    // Get average vehicle price
    const priceStats = await Vehicle.aggregate([
      {
        $group: {
          _id: null,
          avgPrice: { $avg: '$basePrice' },
          minPrice: { $min: '$basePrice' },
          maxPrice: { $max: '$basePrice' },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        vehiclesByBrand,
        assetsByCategory,
        priceStats: priceStats[0] || { avgPrice: 0, minPrice: 0, maxPrice: 0 },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics',
      error: error.message,
    });
  }
};
