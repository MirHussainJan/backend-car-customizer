import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Check if running in serverless environment (Vercel, AWS Lambda, etc.)
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NODE_ENV === 'production';

// Storage configuration
let storage: multer.StorageEngine;

if (isServerless) {
  // Use memory storage for serverless (files temporarily stored in memory)
  // For production file uploads, use cloud storage like AWS S3, Cloudinary, or Vercel Blob
  storage = multer.memoryStorage();
} else {
  // Local disk storage for development
  const UPLOAD_DIR = path.join(__dirname, '../../..', 'Frontend', 'public', 'models');
  
  // Ensure upload directory exists (only in development)
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
      // Generate unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, `${name}-${uniqueSuffix}${ext}`);
    },
  });
}

// File filter - accept only .glb and .gltf files
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedExtensions = ['.glb', '.gltf'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .glb and .gltf files are allowed'));
  }
};

// Configure multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800'), // 50MB default
  },
});
