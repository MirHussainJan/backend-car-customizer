# 📁 File Upload Configuration - Vercel Fixed!

## ✅ Issue Resolved

**Error:** `ENOENT: no such file or directory, mkdir '/var/Frontend/public/models'`

**Cause:** Multer was trying to create directories at module load time in Vercel's read-only serverless environment.

**Solution:** ✅ Updated multer configuration to use memory storage in serverless environments.

---

## 🔧 What Was Fixed

### `src/config/multer.ts`
- ✅ Detects serverless environment (Vercel, AWS Lambda)
- ✅ Uses **memory storage** in production (no file system access)
- ✅ Uses **disk storage** in local development
- ✅ No more directory creation at module load

### `src/controllers/vehicleController.ts`
- ✅ Returns appropriate message for serverless file uploads
- ✅ Indicates cloud storage integration needed
- ✅ Works normally in local development

---

## 🚀 Deploy Now

Your backend should now deploy successfully to Vercel!

```bash
# In Backend directory
git add .
git commit -m "Fix multer for serverless deployment"
git push

# Or redeploy in Vercel Dashboard
```

---

## 📤 File Uploads in Production (Optional Enhancement)

Currently, file uploads are **disabled in production** and return a 501 error. To enable them, integrate cloud storage:

### Option 1: Vercel Blob (Recommended for Vercel)

**Install:**
```bash
npm install @vercel/blob
```

**Update `multer.ts`:**
```typescript
import { put } from '@vercel/blob';

// In uploadVehicleModel controller:
if (isServerless && req.file) {
  const blob = await put(req.file.originalname, req.file.buffer, {
    access: 'public',
  });
  
  return res.json({
    success: true,
    data: { modelUrl: blob.url }
  });
}
```

**Add to `.env`:**
```env
BLOB_READ_WRITE_TOKEN=your_vercel_token
```

### Option 2: AWS S3

**Install:**
```bash
npm install @aws-sdk/client-s3 multer-s3
```

**Update `multer.ts`:**
```typescript
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const storage = multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET_NAME!,
  acl: 'public-read',
  key: (req, file, cb) => {
    cb(null, `models/${Date.now()}-${file.originalname}`);
  },
});
```

**Add to Vercel Environment Variables:**
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=your_bucket_name
```

### Option 3: Cloudinary

**Install:**
```bash
npm install cloudinary multer-storage-cloudinary
```

**Update `multer.ts`:**
```typescript
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'car-models',
    resource_type: 'raw',
    allowed_formats: ['glb', 'gltf'],
  },
});
```

**Add to Vercel Environment Variables:**
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🧪 Testing

### Test API Deployment

```bash
# Should now work without errors
curl https://your-backend.vercel.app/

# Should return API info
```

### Test File Upload (Will return 501)

```bash
curl -X POST https://your-backend.vercel.app/api/vehicles/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "model=@test.glb"

# Response:
# {
#   "success": false,
#   "message": "File uploads require cloud storage integration in production"
# }
```

---

## 📝 Current Behavior

### In Local Development (npm run dev)
- ✅ Files saved to `Frontend/public/models/`
- ✅ Files accessible at `/models/filename.glb`
- ✅ Upload endpoint works normally

### In Production (Vercel)
- ✅ API works without crashes
- ✅ All other endpoints functional
- ⚠️ File upload returns 501 "Not Implemented" (cloud storage needed)
- ✅ Files in memory but not persisted

---

## 📊 Files Changed

```
Backend/
├── src/
│   ├── config/
│   │   └── multer.ts            ✅ FIXED - Memory storage for serverless
│   └── controllers/
│       └── vehicleController.ts ✅ UPDATED - Serverless handling
└── FILE_UPLOAD_FIX.md           ✅ NEW - This file
```

---

## ✅ Summary

Your backend will now:
- ✅ **Deploy successfully** to Vercel
- ✅ **No more directory errors**
- ✅ **Work in local development** with disk storage
- ✅ **Work in production** with memory storage (files not persisted)
- ⚠️ **File uploads require cloud storage** for production use

---

## 🚀 Next Steps

1. **Redeploy to Vercel** - Error should be gone!
2. **(Optional) Add cloud storage** - If you need file uploads in production
3. **Test your API** - Should work perfectly now

---

## 🆘 If You Still Get Errors

**Check:**
1. All files committed and pushed
2. Vercel redeployed after changes
3. View runtime logs in Vercel dashboard

**Logs should now show:**
- ✅ "MongoDB connected successfully"
- ✅ No multer/directory errors
- ✅ API endpoints working

Good luck! 🎉
