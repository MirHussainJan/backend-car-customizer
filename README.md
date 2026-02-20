# Car Customization Platform - Backend API

A comprehensive RESTful API for managing car brands, vehicles, and customization assets.

## 🚀 Features

- **Brand Management**: CRUD operations for car brands
- **Vehicle Management**: Manage vehicle inventory with detailed specifications
- **Customization Assets**: Handle paint, wheels, interior, exterior, and performance upgrades
- **File Upload**: Support for uploading 3D models (.glb/.gltf files)
- **Analytics**: Dashboard metrics and analytics data
- **MongoDB Integration**: Persistent data storage
- **Validation**: Request validation using express-validator
- **Error Handling**: Comprehensive error handling middleware

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn or pnpm

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the Backend directory:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

### Seed Database
```bash
npm run seed
```

## 📚 API Endpoints

### Brands
- `GET /api/brands` - Get all brands
- `GET /api/brands/:id` - Get brand by ID
- `POST /api/brands` - Create new brand
- `PUT /api/brands/:id` - Update brand
- `DELETE /api/brands/:id` - Delete brand

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles?brandId=:id` - Get vehicles by brand
- `GET /api/vehicles/:id` - Get vehicle by ID
- `POST /api/vehicles` - Create new vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle
- `POST /api/vehicles/upload` - Upload 3D model file

### Customization Assets
- `GET /api/assets` - Get all assets
- `GET /api/assets?category=:category` - Filter by category
- `GET /api/assets/category/:category` - Get assets by category
- `GET /api/assets/:id` - Get asset by ID
- `POST /api/assets` - Create new asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset

### Analytics
- `GET /api/analytics/metrics` - Get dashboard metrics
- `GET /api/analytics` - Get analytics data

### Health
- `GET /api/health` - API health check

## 📁 Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   ├── database.ts      # MongoDB connection
│   │   └── multer.ts        # File upload configuration
│   ├── controllers/         # Request handlers
│   │   ├── brandController.ts
│   │   ├── vehicleController.ts
│   │   ├── assetController.ts
│   │   ├── analyticsController.ts
│   │   └── index.ts
│   ├── middleware/          # Custom middleware
│   │   ├── errorHandler.ts
│   │   └── index.ts
│   ├── models/              # Mongoose models
│   │   ├── Brand.ts
│   │   ├── Vehicle.ts
│   │   ├── CustomizationAsset.ts
│   │   └── index.ts
│   ├── routes/              # API routes
│   │   ├── brands.ts
│   │   ├── vehicles.ts
│   │   ├── assets.ts
│   │   ├── analytics.ts
│   │   └── index.ts
│   ├── scripts/
│   │   └── seed.ts          # Database seeding
│   ├── validators/          # Input validation
│   │   └── index.ts
│   └── server.ts            # Application entry point
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/car-customization |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |
| MAX_FILE_SIZE | Max upload size in bytes | 52428800 (50MB) |

## 🧪 Testing with cURL

See the CURL_COMMANDS.md file for detailed examples.

## 📦 Dependencies

### Core
- express - Web framework
- mongoose - MongoDB ODM
- cors - CORS middleware
- dotenv - Environment variables

### Utilities
- multer - File upload handling
- express-validator - Request validation
- helmet - Security headers
- morgan - HTTP logging
- compression - Response compression

### Development
- typescript - Type safety
- ts-node - TypeScript execution
- nodemon - Auto-restart on changes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

ISC
