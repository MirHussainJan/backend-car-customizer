# 🚀 Vercel Deployment Guide - Backend

## Prerequisites
- Vercel account
- MongoDB Atlas database (or accessible MongoDB URI)
- Git repository pushed to GitHub/GitLab/Bitbucket

## 📋 Step-by-Step Deployment

### 1. Prepare Your Backend

✅ **Already Done:**
- `vercel.json` configuration created
- `api/index.ts` serverless entry point created
- Database connection optimized for serverless
- CORS configured for Vercel domains
- Server setup updated for production

### 2. Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### 3. Deploy to Vercel

**Option A: Using Vercel Dashboard (Recommended)**

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository (Backend folder)
4. Configure project:
   - **Framework Preset:** Other
   - **Root Directory:** `Backend` (if in monorepo)
   - **Build Command:** `npm run build` (or leave default)
   - **Output Directory:** Leave empty or `dist`
   - **Install Command:** `npm install`

5. Add Environment Variables (see below)
6. Click "Deploy"

**Option B: Using Vercel CLI**

```bash
cd Backend
vercel
```

Follow the prompts and add environment variables when asked.

### 4. Environment Variables (CRITICAL!)

Add these in Vercel Dashboard → Project → Settings → Environment Variables:

```env
# Required
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car-customization?retryWrites=true&w=majority
JWT_SECRET=your-very-secure-secret-key-min-32-characters-long
NODE_ENV=production

# Optional but Recommended
FRONTEND_URL=https://your-frontend-domain.vercel.app
PORT=5000
```

**Important Notes:**
- ✅ Use your MongoDB Atlas connection string (not localhost)
- ✅ Generate a strong JWT_SECRET (32+ characters)
- ✅ Set NODE_ENV to "production"
- ✅ Update FRONTEND_URL after deploying frontend

### 5. MongoDB Atlas Setup

If you haven't already:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Database Access → Add Database User
4. Network Access → Add IP Address → **Allow Access from Anywhere** (0.0.0.0/0)
   - Required for Vercel serverless functions
5. Get connection string from Database → Connect → Connect Your Application
6. Replace `<username>` and `<password>` in connection string
7. Add to Vercel environment variables

### 6. Verify Deployment

After deployment, test your endpoints:

```bash
# Check if API is running
curl https://your-backend.vercel.app/

# Should return:
# {
#   "success": true,
#   "message": "Car Customization Platform API",
#   "version": "1.0.0",
#   ...
# }

# Test authentication
curl -X POST https://your-backend.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@autoforge.com","password":"admin123"}'
```

### 7. Update Frontend

After backend is deployed, update your Frontend `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app/api
```

## 🚨 Common Issues & Solutions

### Issue 1: "FUNCTION_INVOCATION_FAILED"
**Cause:** Missing environment variables or MongoDB connection issues

**Solution:**
1. Check Vercel logs: Project → Deployments → Click deployment → Runtime Logs
2. Verify all environment variables are set
3. Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
4. Check MongoDB URI is correct

### Issue 2: CORS Errors
**Cause:** Frontend domain not allowed

**Solution:**
- The code already allows all `.vercel.app` domains
- Add specific frontend URL to `FRONTEND_URL` environment variable

### Issue 3: "Cannot find module"
**Cause:** Missing dependencies or wrong paths

**Solution:**
- Make sure `package.json` includes all dependencies
- Vercel should auto-install dependencies
- Check build logs for errors

### Issue 4: Database Connection Timeout
**Cause:** MongoDB Atlas network access restrictions

**Solution:**
1. MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Save and redeploy

### Issue 5: JWT Verification Fails
**Cause:** JWT_SECRET not set or different from seed

**Solution:**
- Set JWT_SECRET in Vercel environment variables
- Must be the same value used when seeding users
- Redeploy after setting

## 📊 Monitoring

### View Logs
```bash
vercel logs https://your-backend.vercel.app
```

Or in Dashboard:
1. Go to your project
2. Click "Deployments"
3. Click on the deployment
4. View "Runtime Logs" and "Build Logs"

### Performance
- Vercel Dashboard shows function execution time
- Monitor cold start times
- Check function invocation count

## 🔧 Configuration Files Explained

### `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.ts",      // Entry point
      "use": "@vercel/node"        // Node.js runtime
    }
  ],
  "routes": [
    {
      "src": "/(.*)",              // All routes
      "dest": "api/index.ts"       // Go to serverless function
    }
  ]
}
```

### `api/index.ts`
```typescript
// Serverless function entry point
import app from '../src/server';
export default app;
```

### Updated `server.ts`
- ✅ Cached MongoDB connections for serverless
- ✅ CORS configured for Vercel domains
- ✅ No app.listen() in production (Vercel handles it)
- ✅ Exports app for Vercel to use

## 🎯 Deployment Checklist

Before deploying, make sure:

- ✅ MongoDB Atlas is set up with network access from anywhere
- ✅ All environment variables noted down
- ✅ Code is pushed to Git repository
- ✅ `vercel.json` exists in Backend folder
- ✅ `api/index.ts` exists
- ✅ `package.json` has all dependencies
- ✅ Database has admin user seeded (or will seed after deployment)

After initial deployment:

- ✅ Add all environment variables in Vercel
- ✅ Redeploy after adding variables
- ✅ Test all endpoints
- ✅ Update frontend with new backend URL
- ✅ Test authentication flow end-to-end

## 🔄 Continuous Deployment

Once set up, Vercel will automatically:
- Deploy on every push to main branch
- Run build checks
- Generate preview URLs for branches
- Show build and runtime logs

## 📝 Environment Variables Template

Save this for easy setup:

```env
# MongoDB (REQUIRED)
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/car-customization?retryWrites=true&w=majority

# JWT Secret (REQUIRED)
JWT_SECRET=generate-a-very-secure-random-string-at-least-32-characters-long

# Node Environment (REQUIRED)
NODE_ENV=production

# Frontend URL (OPTIONAL)
FRONTEND_URL=https://your-frontend.vercel.app

# Port (OPTIONAL, Vercel sets automatically)
PORT=5000
```

## 🎉 Success!

Your backend should now be deployed on Vercel! 

**Next Steps:**
1. Save your deployment URL: `https://your-project.vercel.app`
2. Test all endpoints
3. Deploy frontend with updated API URL
4. Test full authentication flow

**Your API is now live at:**
```
https://your-project-name.vercel.app/api
```

---

## 🆘 Need Help?

**Check Logs:**
```bash
vercel logs --follow
```

**Redeploy:**
```bash
vercel --prod
```

**Common Commands:**
```bash
vercel                    # Deploy to preview
vercel --prod            # Deploy to production
vercel logs              # View logs
vercel env ls            # List environment variables
vercel env add           # Add environment variable
```

For more help, check [Vercel Documentation](https://vercel.com/docs) or the runtime logs in your Vercel dashboard.
