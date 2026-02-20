# Car Customization Platform - Backend API
# Quick Test Script for PowerShell

$baseUrl = "http://localhost:5000"

Write-Host "`n=====================================" -ForegroundColor Cyan
Write-Host "🚗 Car Customization Platform API Test" -ForegroundColor Cyan
Write-Host "=====================================`n" -ForegroundColor Cyan

# Test 1: Health Check
Write-Host "1️⃣  Testing API Health..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/api/health" -Method Get
    Write-Host "✅ API is running!" -ForegroundColor Green
    Write-Host "   Response: $($health | ConvertTo-Json -Compress)" -ForegroundColor Gray
} catch {
    Write-Host "❌ API Health Check Failed!" -ForegroundColor Red
    Write-Host "   Make sure the server is running with: npm run dev" -ForegroundColor Yellow
    exit
}

Start-Sleep -Seconds 1

# Test 2: Get Brands
Write-Host "`n2️⃣  Fetching Brands..." -ForegroundColor Yellow
try {
    $brands = Invoke-RestMethod -Uri "$baseUrl/api/brands" -Method Get
    Write-Host "✅ Found $($brands.count) brands" -ForegroundColor Green
    foreach ($brand in $brands.data) {
        Write-Host "   $($brand.logo) $($brand.name) - $($brand.country)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Failed to fetch brands" -ForegroundColor Red
}

Start-Sleep -Seconds 1

# Test 3: Get Vehicles
Write-Host "`n3️⃣  Fetching Vehicles..." -ForegroundColor Yellow
try {
    $vehicles = Invoke-RestMethod -Uri "$baseUrl/api/vehicles" -Method Get
    Write-Host "✅ Found $($vehicles.count) vehicles" -ForegroundColor Green
    foreach ($vehicle in $vehicles.data) {
        Write-Host "   $($vehicle.thumbnail) $($vehicle.name) - $($vehicle.year) - `$$($vehicle.basePrice)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Failed to fetch vehicles" -ForegroundColor Red
}

Start-Sleep -Seconds 1

# Test 4: Get Assets
Write-Host "`n4️⃣  Fetching Customization Assets..." -ForegroundColor Yellow
try {
    $assets = Invoke-RestMethod -Uri "$baseUrl/api/assets" -Method Get
    Write-Host "✅ Found $($assets.count) customization assets" -ForegroundColor Green
    
    $categories = $assets.data | Group-Object -Property category
    foreach ($category in $categories) {
        Write-Host "   📦 $($category.Name): $($category.Count) items" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Failed to fetch assets" -ForegroundColor Red
}

Start-Sleep -Seconds 1

# Test 5: Get Analytics
Write-Host "`n5️⃣  Fetching Analytics..." -ForegroundColor Yellow
try {
    $analytics = Invoke-RestMethod -Uri "$baseUrl/api/analytics/metrics" -Method Get
    Write-Host "✅ Analytics retrieved successfully" -ForegroundColor Green
    Write-Host "   📊 Total Brands: $($analytics.data.totalBrands)" -ForegroundColor Gray
    Write-Host "   🚗 Total Vehicles: $($analytics.data.totalVehicles)" -ForegroundColor Gray
    Write-Host "   🎨 Total Assets: $($analytics.data.totalAssets)" -ForegroundColor Gray
    Write-Host "   💰 Total Revenue: `$$($analytics.data.totalRevenue)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Failed to fetch analytics" -ForegroundColor Red
}

# Test 6: Create a Test Brand
Write-Host "`n6️⃣  Creating Test Brand..." -ForegroundColor Yellow
try {
    $newBrand = @{
        name = "Test Motors"
        logo = "🧪"
        description = "Test brand created by PowerShell script"
        founded = 2024
        country = "Test Country"
    } | ConvertTo-Json

    $createdBrand = Invoke-RestMethod -Uri "$baseUrl/api/brands" -Method Post -Body $newBrand -ContentType "application/json"
    Write-Host "✅ Test brand created successfully!" -ForegroundColor Green
    Write-Host "   ID: $($createdBrand.data._id)" -ForegroundColor Gray
    
    # Clean up - delete the test brand
    Start-Sleep -Seconds 1
    Write-Host "   🗑️  Cleaning up test brand..." -ForegroundColor Gray
    $null = Invoke-RestMethod -Uri "$baseUrl/api/brands/$($createdBrand.data._id)" -Method Delete
    Write-Host "   ✅ Test brand deleted" -ForegroundColor Gray
} catch {
    Write-Host "❌ Failed to create test brand" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=====================================" -ForegroundColor Cyan
Write-Host "✅ API Test Complete!" -ForegroundColor Green
Write-Host "=====================================`n" -ForegroundColor Cyan

Write-Host "📚 For more commands, see CURL_COMMANDS.md" -ForegroundColor Yellow
Write-Host "📖 For documentation, see README.md`n" -ForegroundColor Yellow
