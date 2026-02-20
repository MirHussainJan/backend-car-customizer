# 🚀 Quick Start Guide - Car Customization Platform Backend

## Prerequisites Checklist
- [ ] Node.js v18+ installed
- [ ] MongoDB installed (locally or Atlas account)
- [ ] Git (optional)
- [ ] Terminal/PowerShell access

---

## 📦 Installation Steps

### Step 1: Navigate to Backend Directory
```bash
cd Backend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages including:
- Express.js (web framework)
- Mongoose (MongoDB ORM)
- TypeScript and related dev tools
- File upload handling (Multer)
- Validation and security middleware

### Step 3: Setup Environment Variables
The `.env` file is already created with default values:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/car-customization
FRONTEND_URL=http://localhost:3000
```

**If using MongoDB Atlas**, update `MONGODB_URI`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car-customization?retryWrites=true&w=majority
```

### Step 4: Start MongoDB

**Option A - Local MongoDB:**
```bash
# Windows (if installed as service, it's already running)
# Check status in Services app

# macOS (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B - MongoDB Atlas:**
- No local installation needed
- Just update the `MONGODB_URI` in `.env`

### Step 5: Seed the Database (Optional but Recommended)
```bash
npm run seed
```

This will populate the database with:
- 4 sample brands
- 4 sample vehicles
- 8 customization assets

### Step 6: Start the Development Server
```bash
npm run dev
```

You should see:
```
╔══════════════════════════════════════════════╗
║   🚗 Car Customization Platform API        ║
║   ✅ Server running on port 5000           ║
║   🌐 Environment: development              ║
╚══════════════════════════════════════════════╝
```

---

## ✅ Verify Installation

### Test 1: API Health Check
Open a new terminal and run:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-01-30T..."
}
```

### Test 2: Get All Brands
```bash
curl http://localhost:5000/api/brands
```

Should return the seeded brands data.

### Test 3: Browser Test
Open your browser and visit:
- http://localhost:5000 (API info)
- http://localhost:5000/api/health (health check)
- http://localhost:5000/api/brands (brands list)

---

## 🎯 Next Steps

1. **Review API Documentation**
   - See `CURL_COMMANDS.md` for all available endpoints
   - See `README.md` for project overview

2. **Test API Endpoints**
   ```bash
   # Get all vehicles
   curl http://localhost:5000/api/vehicles
   
   # Get all customization assets
   curl http://localhost:5000/api/assets
   
   # Get analytics
   curl http://localhost:5000/api/analytics/metrics
   ```

3. **Upload a 3D Model**
   ```bash
   curl -X POST http://localhost:5000/api/vehicles/upload \
     -F "model=@/path/to/your/model.glb"
   ```

4. **Connect Frontend**
   - Make sure frontend's API calls point to `http://localhost:5000`
   - CORS is already configured for `http://localhost:3000`

---

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with auto-reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production build |
| `npm run seed` | Seed database with sample data |
| `npm run watch` | Watch TypeScript files for changes |

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5000 is already in use:
1. Change `PORT` in `.env` to another port (e.g., 5001)
2. Restart the server

### MongoDB Connection Error
```
❌ MongoDB connection error: connect ECONNREFUSED
```

**Solutions:**
- Ensure MongoDB is running: `mongod --version`
- Check MongoDB service status
- Verify `MONGODB_URI` in `.env` is correct
- For Atlas: Check network access and credentials

### TypeScript Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### File Upload Not Working
- Verify `Frontend/public/models` directory exists
- Check file permissions
- Ensure file is `.glb` or `.gltf` format
- Check file size (max 50MB by default)

---

## 📁 Project Structure Overview

```
Backend/
├── src/
│   ├── config/          # Database and multer config
│   ├── controllers/     # Business logic
│   ├── middleware/      # Error handling
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── scripts/         # Utility scripts (seed)
│   ├── validators/      # Input validation
│   └── server.ts        # App entry point
├── .env                 # Environment variables
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript config
```

---

## 🌐 API Base URLs

- **Development**: http://localhost:5000
- **Production**: (Configure in deployment)

All API routes are prefixed with `/api`:
- Brands: `/api/brands`
- Vehicles: `/api/vehicles`
- Assets: `/api/assets`
- Analytics: `/api/analytics`

---

## 🔐 Security Notes

- CORS is configured for `http://localhost:3000` (update in `.env` for production)
- Helmet.js provides security headers
- Input validation on all POST/PUT requests
- File upload restricted to `.glb` and `.gltf` files only

---

## 📊 Database Schema

### Brands Collection
- name, logo, description
- founded, country
- timestamps

### Vehicles Collection
- name, brandId (ref), model, year
- basePrice, price, modelUrl
- specs (engine, horsepower, torque, 0-60)
- timestamps

### CustomizationAssets Collection
- name, category, description
- price, image
- compatibility (array of vehicle IDs)
- timestamps

---

## 🎉 You're All Set!

The backend is now running and ready to serve the frontend application.

**Useful Commands:**
```bash
# Check what's running
npm run dev

# Seed fresh data
npm run seed

# Test API
curl http://localhost:5000/api/brands

# View logs
# They appear in the terminal where you ran npm run dev
```

**Need Help?**
- Check `README.md` for full documentation
- See `CURL_COMMANDS.md` for API examples
- Review error logs in the terminal

Happy coding! 🚀
