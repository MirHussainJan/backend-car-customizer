import { body } from 'express-validator';

// Brand validation rules
export const brandValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Brand name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Brand name must be between 2 and 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  
  body('founded')
    .isInt({ min: 1800, max: 2100 })
    .withMessage('Founded year must be between 1800 and 2100'),
  
  body('country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  
  body('logo')
    .optional()
    .isString()
    .withMessage('Logo must be a string'),
];

// Vehicle validation rules
export const vehicleValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Vehicle name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Vehicle name must be between 2 and 100 characters'),
  
  body('brandId')
    .notEmpty()
    .withMessage('Brand ID is required')
    .isMongoId()
    .withMessage('Invalid Brand ID'),
  
  body('vehicleModel')
    .trim()
    .notEmpty()
    .withMessage('Model is required'),
  
  body('year')
    .isInt({ min: 1900, max: 2100 })
    .withMessage('Year must be between 1900 and 2100'),
  
  body('basePrice')
    .isFloat({ min: 0 })
    .withMessage('Base price must be a positive number'),
  
  body('modelUrl')
    .optional()
    .trim(),
  
  body('thumbnail')
    .optional()
    .trim(),
  
  body('description')
    .optional()
    .trim(),
  
  body('specs.engine')
    .optional()
    .trim(),
  
  body('specs.horsepower')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Horsepower must be a positive number'),
  
  body('specs.torque')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Torque must be a positive number'),
  
  body('specs.zeroToSixty')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('0-60 time must be a positive number'),
];

// Customization Asset validation rules
export const assetValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Asset name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Asset name must be between 2 and 100 characters'),
  
  body('category')
    .isIn(['paint', 'wheels', 'interior', 'exterior', 'performance'])
    .withMessage('Invalid category'),
  
  body('description')
    .optional()
    .trim(),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('compatibility')
    .optional()
    .isArray()
    .withMessage('Compatibility must be an array'),
  
  body('compatibility.*')
    .optional()
    .isMongoId()
    .withMessage('Invalid vehicle ID in compatibility array'),
];
