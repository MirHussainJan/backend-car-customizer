# cURL Commands for Car Customization Platform API

Base URL: `http://localhost:5000`

## 🏥 Health Check

```bash
curl http://localhost:5000/api/health
```

---

## 🏛️ Brands

### Get All Brands
```bash
curl http://localhost:5000/api/brands
```

### Get Brand by ID
```bash
curl http://localhost:5000/api/brands/BRAND_ID_HERE
```

### Create New Brand
```bash
curl -X POST http://localhost:5000/api/brands \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tesla Motors",
    "logo": "⚡",
    "description": "Leading electric vehicle manufacturer",
    "founded": 2003,
    "country": "USA"
  }'
```

### Update Brand
```bash
curl -X PUT http://localhost:5000/api/brands/BRAND_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tesla Motors Inc.",
    "description": "Leading electric vehicle and clean energy company"
  }'
```

### Delete Brand
```bash
curl -X DELETE http://localhost:5000/api/brands/BRAND_ID_HERE
```

---

## 🚗 Vehicles

### Get All Vehicles
```bash
curl http://localhost:5000/api/vehicles
```

### Get Vehicles by Brand
```bash
curl "http://localhost:5000/api/vehicles?brandId=BRAND_ID_HERE"
```

### Get Vehicle by ID
```bash
curl http://localhost:5000/api/vehicles/VEHICLE_ID_HERE
```

### Create New Vehicle
```bash
curl -X POST http://localhost:5000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Model S Plaid",
    "brandId": "BRAND_ID_HERE",
    "vehicleModel": "Plaid",
    "year": 2024,
    "basePrice": 129990,
    "modelUrl": "/models/model-s-plaid.glb",
    "thumbnail": "🏎️",
    "description": "Fastest production sedan with tri-motor setup",
    "specs": {
      "engine": "Tri-Motor Electric",
      "horsepower": 1020,
      "torque": 1050,
      "zeroToSixty": 1.99
    }
  }'
```

### Update Vehicle
```bash
curl -X PUT http://localhost:5000/api/vehicles/VEHICLE_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "basePrice": 134990,
    "description": "Updated: Fastest production sedan with tri-motor setup and Track Mode"
  }'
```

### Delete Vehicle
```bash
curl -X DELETE http://localhost:5000/api/vehicles/VEHICLE_ID_HERE
```

### Upload Vehicle 3D Model (GLB file)
```bash
curl -X POST http://localhost:5000/api/vehicles/upload \
  -F "model=@/path/to/your/model.glb"
```

**Windows PowerShell:**
```powershell
curl.exe -X POST http://localhost:5000/api/vehicles/upload -F "model=@C:\path\to\your\model.glb"
```

---

## 🎨 Customization Assets

### Get All Assets
```bash
curl http://localhost:5000/api/assets
```

### Filter Assets by Category
```bash
curl "http://localhost:5000/api/assets?category=paint"
curl "http://localhost:5000/api/assets?category=wheels"
curl "http://localhost:5000/api/assets?category=interior"
curl "http://localhost:5000/api/assets?category=exterior"
curl "http://localhost:5000/api/assets?category=performance"
```

### Get Assets by Category (Alternative Route)
```bash
curl http://localhost:5000/api/assets/category/paint
curl http://localhost:5000/api/assets/category/wheels
```

### Get Asset by ID
```bash
curl http://localhost:5000/api/assets/ASSET_ID_HERE
```

### Create New Asset
```bash
curl -X POST http://localhost:5000/api/assets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Midnight Purple",
    "category": "paint",
    "description": "Deep purple with metallic flake",
    "price": 3500,
    "image": "🟣",
    "compatibility": ["VEHICLE_ID_1", "VEHICLE_ID_2"]
  }'
```

### Update Asset
```bash
curl -X PUT http://localhost:5000/api/assets/ASSET_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "price": 3800,
    "description": "Premium deep purple with metallic flake and clear coat"
  }'
```

### Delete Asset
```bash
curl -X DELETE http://localhost:5000/api/assets/ASSET_ID_HERE
```

---

## 📊 Analytics

### Get Dashboard Metrics
```bash
curl http://localhost:5000/api/analytics/metrics
```

**Response Example:**
```json
{
  "success": true,
  "data": {
    "totalBrands": 4,
    "totalVehicles": 12,
    "totalAssets": 8,
    "totalRevenue": 1200000,
    "monthlyGrowth": 12.5,
    "customerSatisfaction": 4.8
  }
}
```

### Get Analytics Data
```bash
curl http://localhost:5000/api/analytics
```

**Response Example:**
```json
{
  "success": true,
  "data": {
    "vehiclesByBrand": [...],
    "assetsByCategory": [...],
    "priceStats": {
      "avgPrice": 96750,
      "minPrice": 78000,
      "maxPrice": 125000
    }
  }
}
```

---

## 📝 Complete Workflow Example

### 1. Check API Health
```bash
curl http://localhost:5000/api/health
```

### 2. Create a Brand
```bash
curl -X POST http://localhost:5000/api/brands \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Porsche",
    "logo": "🏁",
    "description": "German luxury sports car manufacturer",
    "founded": 1931,
    "country": "Germany"
  }'
```
**Save the returned brand ID**

### 3. Upload a 3D Model
```bash
curl -X POST http://localhost:5000/api/vehicles/upload \
  -F "model=@./models/porsche-911.glb"
```
**Save the returned modelUrl**

### 4. Create a Vehicle
```bash
curl -X POST http://localhost:5000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "name": "911 Turbo S",
    "brandId": "BRAND_ID_FROM_STEP_2",
    "vehicleModel": "Turbo S",
    "year": 2024,
    "basePrice": 207000,
    "modelUrl": "/models/porsche-911-XXXXX.glb",
    "thumbnail": "🏎️",
    "description": "Iconic rear-engine sports car with twin-turbo flat-six",
    "specs": {
      "engine": "Twin-Turbo Flat-6",
      "horsepower": 640,
      "torque": 590,
      "zeroToSixty": 2.6
    }
  }'
```
**Save the returned vehicle ID**

### 5. Create Customization Asset
```bash
curl -X POST http://localhost:5000/api/assets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "GT Silver Metallic",
    "category": "paint",
    "description": "Classic Porsche silver finish",
    "price": 4200,
    "image": "⚪",
    "compatibility": ["VEHICLE_ID_FROM_STEP_4"]
  }'
```

### 6. Get Analytics
```bash
curl http://localhost:5000/api/analytics/metrics
```

---

## 🔧 PowerShell-Specific Commands

For Windows PowerShell, use these formats:

### Create Brand
```powershell
$body = @{
    name = "Porsche"
    logo = "🏁"
    description = "German luxury sports car manufacturer"
    founded = 1931
    country = "Germany"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/brands" -Method Post -Body $body -ContentType "application/json"
```

### Get All Vehicles
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/vehicles" -Method Get
```

### Upload File
```powershell
$filePath = "C:\path\to\model.glb"
curl.exe -X POST http://localhost:5000/api/vehicles/upload -F "model=@$filePath"
```

---

## 🎯 Testing Tips

1. **Get IDs First**: Always fetch existing data to get valid IDs:
   ```bash
   curl http://localhost:5000/api/brands
   ```

2. **Use jq for Pretty Output** (if installed):
   ```bash
   curl http://localhost:5000/api/brands | jq
   ```

3. **Save Response to File**:
   ```bash
   curl http://localhost:5000/api/analytics > analytics.json
   ```

4. **Verbose Mode** (see full request/response):
   ```bash
   curl -v http://localhost:5000/api/brands
   ```

5. **Test Error Handling**:
   ```bash
   # Invalid ID format
   curl http://localhost:5000/api/brands/invalid-id
   
   # Missing required fields
   curl -X POST http://localhost:5000/api/brands \
     -H "Content-Type: application/json" \
     -d '{"name": "Test"}'
   ```

---

## 📋 Common Response Codes

- `200 OK` - Successful GET, PUT, DELETE
- `201 Created` - Successful POST (resource created)
- `400 Bad Request` - Validation error or invalid data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## 🚀 Quick Start Script

Save this as `test-api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:5000"

echo "🏥 Testing API Health..."
curl $BASE_URL/api/health

echo -e "\n\n📊 Getting Brands..."
curl $BASE_URL/api/brands | jq

echo -e "\n\n🚗 Getting Vehicles..."
curl $BASE_URL/api/vehicles | jq

echo -e "\n\n🎨 Getting Assets..."
curl $BASE_URL/api/assets | jq

echo -e "\n\n📈 Getting Analytics..."
curl $BASE_URL/api/analytics/metrics | jq

echo -e "\n\n✅ API Test Complete!"
```

Make it executable and run:
```bash
chmod +x test-api.sh
./test-api.sh
```
