export { 
  getAllBrands, 
  getBrandById, 
  createBrand, 
  updateBrand, 
  deleteBrand 
} from './brandController';

export { 
  getAllVehicles, 
  getVehicleById, 
  createVehicle, 
  updateVehicle, 
  deleteVehicle,
  uploadVehicleModel
} from './vehicleController';

export { 
  getAllAssets, 
  getAssetById, 
  createAsset, 
  updateAsset, 
  deleteAsset,
  getAssetsByCategory
} from './assetController';

export {
  getDashboardMetrics,
  getAnalytics
} from './analyticsController';

export {
  register,
  login,
  getMe
} from './authController';
