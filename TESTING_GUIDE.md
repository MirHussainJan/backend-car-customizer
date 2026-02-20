# 🎯 STEP-BY-STEP API TESTING GUIDE

Follow these steps to test your Car Customization Platform API after installation.

---

## ✅ Prerequisites

- [ ] MongoDB is running
- [ ] Backend dependencies installed (`npm install`)
- [ ] Database seeded (`npm run seed`)
- [ ] Server is running (`npm run dev`)

---

## 📝 STEP 1: Verify Server is Running

### Command:
```bash
curl http://localhost:5000/api/health
```

### Expected Response:
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-01-30T..."
}
```

**Status:** If you see this, the API is running! ✅

---

## 📝 STEP 2: Get All Seeded Brands

### Command:
```bash
curl http://localhost:5000/api/brands
```

### Expected Response:
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "65abc123...",
      "name": "Apex Motors",
      "logo": "🏛️",
      "description": "Premium performance vehicles...",
      "founded": 2010,
      "country": "USA",
      "createdAt": "2024-01-15T...",
      "updatedAt": "2024-01-15T..."
    },
    ...
  ]
}
```

**Action:** Copy one of the `_id` values - you'll need it for the next steps!

**Example:** `"_id": "65abc123def456789012345"`

---

## 📝 STEP 3: Get a Specific Brand

### Command:
```bash
curl http://localhost:5000/api/brands/PASTE_ID_HERE
```

**Replace `PASTE_ID_HERE` with the ID you copied in Step 2**

### Example:
```bash
curl http://localhost:5000/api/brands/65abc123def456789012345
```

### Expected Response:
```json
{
  "success": true,
  "data": {
    "_id": "65abc123...",
    "name": "Apex Motors",
    ...
  }
}
```

---

## 📝 STEP 4: Get All Vehicles

### Command:
```bash
curl http://localhost:5000/api/vehicles
```

### Expected Response:
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "65xyz...",
      "name": "Apex GT-R",
      "brandId": {
        "_id": "65abc...",
        "name": "Apex Motors",
        "logo": "🏛️"
      },
      "model": "GT-R Premium",
      "year": 2024,
      "basePrice": 89000,
      ...
    },
    ...
  ]
}
```

**Action:** Save a vehicle `_id` for later steps!

---

## 📝 STEP 5: Get Analytics

### Command:
```bash
curl http://localhost:5000/api/analytics/metrics
```

### Expected Response:
```json
{
  "success": true,
  "data": {
    "totalBrands": 4,
    "totalVehicles": 4,
    "totalAssets": 8,
    "totalRevenue": 387000,
    "monthlyGrowth": 12.5,
    "customerSatisfaction": 4.8
  }
}
```

---

## 📝 STEP 6: Get Customization Assets

### Command:
```bash
curl http://localhost:5000/api/assets
```

### Expected Response:
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "65def...",
      "name": "Metallic Sapphire Blue",
      "category": "paint",
      "description": "Premium metallic paint...",
      "price": 2500,
      "image": "🔵",
      "compatibility": [...],
      ...
    },
    ...
  ]
}
```

---

## 📝 STEP 7: Filter Assets by Category

### Command:
```bash
curl "http://localhost:5000/api/assets?category=paint"
```

### Expected Response:
Only assets with category "paint" should be returned.

### Try other categories:
```bash
curl "http://localhost:5000/api/assets?category=wheels"
curl "http://localhost:5000/api/assets?category=performance"
```

---

## 📝 STEP 8: Create a New Brand

### Command:
```bash
curl -X POST http://localhost:5000/api/brands \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Test Brand",
    "logo": "🧪",
    "description": "This is a test brand created via API",
    "founded": 2024,
    "country": "Test Country"
  }'
```

### Expected Response:
```json
{
  "success": true,
  "message": "Brand created successfully",
  "data": {
    "_id": "NEW_ID_HERE",
    "name": "My Test Brand",
    "logo": "🧪",
    ...
  }
}
```

**Action:** Save the new brand's `_id`!

---

## 📝 STEP 9: Update the Brand You Just Created

### Command:
```bash
curl -X PUT http://localhost:5000/api/brands/NEW_BRAND_ID \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated description for my test brand"
  }'
```

**Replace `NEW_BRAND_ID` with the ID from Step 8**

### Expected Response:
```json
{
  "success": true,
  "message": "Brand updated successfully",
  "data": {
    "_id": "...",
    "description": "Updated description for my test brand",
    ...
  }
}
```

---

## 📝 STEP 10: Create a Vehicle

### Command:
```bash
curl -X POST http://localhost:5000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Vehicle",
    "brandId": "PASTE_BRAND_ID_HERE",
    "model": "Test Model",
    "year": 2024,
    "basePrice": 50000,
    "modelUrl": "/models/test-car.glb",
    "thumbnail": "🚗",
    "description": "A test vehicle created via API",
    "specs": {
      "engine": "Test Engine",
      "horsepower": 300,
      "torque": 350,
      "zeroToSixty": 5.0
    }
  }'
```

**Replace `PASTE_BRAND_ID_HERE` with any brand ID (from Step 2 or Step 8)**

### Expected Response:
```json
{
  "success": true,
  "message": "Vehicle created successfully",
  "data": {
    "_id": "NEW_VEHICLE_ID",
    "name": "Test Vehicle",
    ...
  }
}
```

---

## 📝 STEP 11: Upload a 3D Model File

### For Linux/Mac:
```bash
curl -X POST http://localhost:5000/api/vehicles/upload \
  -F "model=@/path/to/your/model.glb"
```

### For Windows:
```powershell
curl.exe -X POST http://localhost:5000/api/vehicles/upload -F "model=@C:\path\to\model.glb"
```

### Expected Response:
```json
{
  "success": true,
  "message": "Model uploaded successfully",
  "data": {
    "filename": "model-1706620800000.glb",
    "modelUrl": "/models/model-1706620800000.glb",
    "size": 1024000
  }
}
```

**Note:** The file will be saved to `Frontend/public/models/`

---

## 📝 STEP 12: Create a Customization Asset

### Command:
```bash
curl -X POST http://localhost:5000/api/assets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Paint Color",
    "category": "paint",
    "description": "A test paint color",
    "price": 1500,
    "image": "🎨",
    "compatibility": ["VEHICLE_ID_1", "VEHICLE_ID_2"]
  }'
```

**Replace vehicle IDs with actual IDs from Step 4 or Step 10**

### Expected Response:
```json
{
  "success": true,
  "message": "Asset created successfully",
  "data": {
    "_id": "NEW_ASSET_ID",
    "name": "Test Paint Color",
    ...
  }
}
```

---

## 📝 STEP 13: Delete Test Data

### Delete the test brand:
```bash
curl -X DELETE http://localhost:5000/api/brands/TEST_BRAND_ID
```

### Delete the test vehicle:
```bash
curl -X DELETE http://localhost:5000/api/vehicles/TEST_VEHICLE_ID
```

### Delete the test asset:
```bash
curl -X DELETE http://localhost:5000/api/assets/TEST_ASSET_ID
```

### Expected Response (for all):
```json
{
  "success": true,
  "message": "Brand/Vehicle/Asset deleted successfully",
  "data": { ... }
}
```

---

## 📝 STEP 14: Verify Analytics Updated

### Command:
```bash
curl http://localhost:5000/api/analytics/metrics
```

The counts should reflect the deletions you just made.

---

## 🎯 ADVANCED TESTS

### Test 1: Error Handling - Invalid ID
```bash
curl http://localhost:5000/api/brands/invalid-id
```

**Expected:** 400 error with "Invalid ID format"

### Test 2: Error Handling - Missing Required Field
```bash
curl -X POST http://localhost:5000/api/brands \
  -H "Content-Type: application/json" \
  -d '{"name": "Incomplete Brand"}'
```

**Expected:** 400 error with validation errors

### Test 3: Error Handling - Non-existent Resource
```bash
curl http://localhost:5000/api/brands/000000000000000000000000
```

**Expected:** 404 error "Brand not found"

### Test 4: Filter Vehicles by Brand
```bash
curl "http://localhost:5000/api/vehicles?brandId=PASTE_BRAND_ID"
```

**Expected:** Only vehicles from that brand

### Test 5: Get Detailed Analytics
```bash
curl http://localhost:5000/api/analytics
```

**Expected:** Detailed breakdown with charts data

---

## 🖥️ POWERSHELL USERS

Use the included test script:
```powershell
.\test-api.ps1
```

This will automatically run all basic tests and show colored output.

---

## ✅ SUCCESS CHECKLIST

After completing all steps, you should have:

- [x] Verified API health
- [x] Retrieved all brands
- [x] Retrieved a specific brand
- [x] Retrieved all vehicles
- [x] Retrieved analytics
- [x] Retrieved customization assets
- [x] Filtered assets by category
- [x] Created a new brand
- [x] Updated a brand
- [x] Created a new vehicle
- [x] Uploaded a 3D model (optional if you have a .glb file)
- [x] Created a customization asset
- [x] Deleted test data
- [x] Tested error handling

---

## 🎉 CONGRATULATIONS!

You've successfully tested all major endpoints of the Car Customization Platform API!

### What's Next?

1. **Integrate with Frontend**: Update your frontend to use these endpoints
2. **Add Authentication**: Implement user auth for admin routes
3. **Deploy**: Consider deploying to production (Heroku, Railway, Render, etc.)
4. **Optimize**: Add caching, rate limiting, etc.

### Quick Reference Files:
- `CURL_QUICK_REFERENCE.md` - Quick copy-paste commands
- `CURL_COMMANDS.md` - Detailed documentation
- `README.md` - Full project documentation
- `test-api.ps1` - Automated test script (PowerShell)

---

**Need Help?**
- Check terminal logs where `npm run dev` is running
- Review error messages - they're descriptive
- Ensure MongoDB is running
- Verify all IDs are valid MongoDB ObjectIDs

Happy Testing! 🚀
