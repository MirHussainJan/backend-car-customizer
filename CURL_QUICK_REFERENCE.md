# 🚀 QUICK CURL REFERENCE GUIDE

Quick copy-paste curl commands for testing the Car Customization Platform API.

**Base URL:** `http://localhost:5000`

---

## 🏥 HEALTH CHECK

```bash
curl http://localhost:5000/api/health
```

---

## 🏛️ BRANDS

### Get All Brands
```bash
curl http://localhost:5000/api/brands
```

### Get Brand by ID
```bash
curl http://localhost:5000/api/brands/YOUR_BRAND_ID
```

### Create Brand
```bash
curl -X POST http://localhost:5000/api/brands \
  -H "Content-Type: application/json" \
  -d '{"name":"Ferrari","logo":"🏎️","description":"Italian luxury sports car manufacturer","founded":1947,"country":"Italy"}'
```

### Update Brand
```bash
curl -X PUT http://localhost:5000/api/brands/YOUR_BRAND_ID \
  -H "Content-Type: application/json" \
  -d '{"description":"Updated description"}'
```

### Delete Brand
```bash
curl -X DELETE http://localhost:5000/api/brands/YOUR_BRAND_ID
```

---

## 🚗 VEHICLES

### Get All Vehicles
```bash
curl http://localhost:5000/api/vehicles
```

### Get Vehicles by Brand
```bash
curl "http://localhost:5000/api/vehicles?brandId=YOUR_BRAND_ID"
```

### Get Vehicle by ID
```bash
curl http://localhost:5000/api/vehicles/YOUR_VEHICLE_ID
```

### Create Vehicle
```bash
curl -X POST http://localhost:5000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{"name":"F8 Tributo","brandId":"YOUR_BRAND_ID","model":"F8","year":2024,"basePrice":280000,"modelUrl":"/models/f8.glb","thumbnail":"🏎️","description":"Mid-engine V8 supercar","specs":{"engine":"Twin-Turbo V8","horsepower":710,"torque":568,"zeroToSixty":2.9}}'
```

### Update Vehicle
```bash
curl -X PUT http://localhost:5000/api/vehicles/YOUR_VEHICLE_ID \
  -H "Content-Type: application/json" \
  -d '{"basePrice":285000}'
```

### Delete Vehicle
```bash
curl -X DELETE http://localhost:5000/api/vehicles/YOUR_VEHICLE_ID
```

### Upload 3D Model (Linux/Mac)
```bash
curl -X POST http://localhost:5000/api/vehicles/upload \
  -F "model=@/path/to/your/model.glb"
```

### Upload 3D Model (Windows)
```powershell
curl.exe -X POST http://localhost:5000/api/vehicles/upload -F "model=@C:\path\to\model.glb"
```

---

## 🎨 CUSTOMIZATION ASSETS

### Get All Assets
```bash
curl http://localhost:5000/api/assets
```

### Filter by Category
```bash
curl "http://localhost:5000/api/assets?category=paint"
curl "http://localhost:5000/api/assets?category=wheels"
curl "http://localhost:5000/api/assets?category=interior"
curl "http://localhost:5000/api/assets?category=exterior"
curl "http://localhost:5000/api/assets?category=performance"
```

### Get Asset by ID
```bash
curl http://localhost:5000/api/assets/YOUR_ASSET_ID
```

### Create Asset
```bash
curl -X POST http://localhost:5000/api/assets \
  -H "Content-Type: application/json" \
  -d '{"name":"Racing Stripes","category":"exterior","description":"Classic racing stripes package","price":2500,"image":"🏁","compatibility":["VEHICLE_ID_1","VEHICLE_ID_2"]}'
```

### Update Asset
```bash
curl -X PUT http://localhost:5000/api/assets/YOUR_ASSET_ID \
  -H "Content-Type: application/json" \
  -d '{"price":2800}'
```

### Delete Asset
```bash
curl -X DELETE http://localhost:5000/api/assets/YOUR_ASSET_ID
```

---

## 📊 ANALYTICS

### Get Dashboard Metrics
```bash
curl http://localhost:5000/api/analytics/metrics
```

### Get Detailed Analytics
```bash
curl http://localhost:5000/api/analytics
```

---

## 💡 TIPS

### Pretty Print with jq (if installed)
```bash
curl http://localhost:5000/api/brands | jq
```

### Save Response to File
```bash
curl http://localhost:5000/api/vehicles > vehicles.json
```

### Verbose Output
```bash
curl -v http://localhost:5000/api/health
```

### Get Response Headers
```bash
curl -I http://localhost:5000/api/brands
```

---

## 🔄 COMPLETE WORKFLOW

```bash
# 1. Check API health
curl http://localhost:5000/api/health

# 2. Get all brands (save one ID)
curl http://localhost:5000/api/brands

# 3. Create a new vehicle (use brand ID from step 2)
curl -X POST http://localhost:5000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{"name":"New Car","brandId":"PASTE_BRAND_ID","model":"Model X","year":2024,"basePrice":50000,"modelUrl":"/models/test.glb","thumbnail":"🚗","description":"Test vehicle","specs":{"engine":"V6","horsepower":300,"torque":350,"zeroToSixty":5.5}}'

# 4. Get analytics
curl http://localhost:5000/api/analytics/metrics

# 5. Upload a model file
curl -X POST http://localhost:5000/api/vehicles/upload \
  -F "model=@./your-model.glb"
```

---

## 🖥️ POWERSHELL ALTERNATIVE

```powershell
# Get brands
Invoke-RestMethod -Uri "http://localhost:5000/api/brands" -Method Get

# Create brand
$body = @{
    name = "Porsche"
    logo = "🏁"
    description = "German sports car manufacturer"
    founded = 1931
    country = "Germany"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/brands" -Method Post -Body $body -ContentType "application/json"

# Upload file
curl.exe -X POST http://localhost:5000/api/vehicles/upload -F "model=@C:\models\car.glb"
```

---

## 📋 READY-TO-USE TEST DATA

### Brand Examples
```json
{"name":"Lamborghini","logo":"🐂","description":"Italian exotic car manufacturer","founded":1963,"country":"Italy"}
{"name":"McLaren","logo":"🏁","description":"British supercar manufacturer","founded":1985,"country":"UK"}
{"name":"Bugatti","logo":"👑","description":"French hypercar manufacturer","founded":1909,"country":"France"}
```

### Vehicle Examples
```json
{"name":"Aventador","brandId":"YOUR_BRAND_ID","model":"Aventador SVJ","year":2024,"basePrice":517000,"modelUrl":"/models/aventador.glb","thumbnail":"🏎️","description":"V12 flagship supercar","specs":{"engine":"V12","horsepower":770,"torque":531,"zeroToSixty":2.8}}
{"name":"720S","brandId":"YOUR_BRAND_ID","model":"720S Spider","year":2024,"basePrice":315000,"modelUrl":"/models/720s.glb","thumbnail":"🏎️","description":"Twin-turbo V8 supercar","specs":{"engine":"Twin-Turbo V8","horsepower":710,"torque":568,"zeroToSixty":2.9}}
```

### Asset Examples
```json
{"name":"Matte Black","category":"paint","description":"Premium matte finish","price":5000,"image":"⚫","compatibility":["VEHICLE_ID"]}
{"name":"Carbon Ceramic Brakes","category":"performance","description":"High-performance braking system","price":15000,"image":"🛑","compatibility":["VEHICLE_ID"]}
{"name":"Alcantara Seats","category":"interior","description":"Premium sport seats","price":8000,"image":"🪑","compatibility":["VEHICLE_ID"]}
```

---

**For detailed documentation, see CURL_COMMANDS.md**
