import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Brand, Vehicle, CustomizationAsset, User } from '../models';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/car-customization';

// Mock data
const brands = [
  {
    name: 'Apex Motors',
    logo: '🏛️',
    description: 'Premium performance vehicles with cutting-edge technology',
    founded: 2010,
    foundedYear: 2010,
    country: 'USA',
  },
  {
    name: 'Velocity Dynamics',
    logo: '⚡',
    description: 'High-speed racing and luxury sports cars',
    founded: 2008,
    foundedYear: 2008,
    country: 'Germany',
  },
  {
    name: 'EliteForge',
    logo: '🔧',
    description: 'Handcrafted luxury vehicles for discerning collectors',
    founded: 2012,
    foundedYear: 2012,
    country: 'Italy',
  },
  {
    name: 'QuantumDrive',
    logo: '🚀',
    description: 'Next-generation electric vehicles and autonomous technology',
    founded: 2015,
    foundedYear: 2015,
    country: 'Sweden',
  },
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Brand.deleteMany({});
    await Vehicle.deleteMany({});
    await CustomizationAsset.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      email: 'admin@autoforge.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
    });
    console.log('✅ Created admin user');
    console.log('   📧 Email: admin@autoforge.com');
    console.log('   🔑 Password: admin123');

    // Create sample client user
    const clientUser = await User.create({
      email: 'client@example.com',
      password: 'client123',
      name: 'Demo Client',
      role: 'client',
    });
    console.log('✅ Created client user');
    console.log('   📧 Email: client@example.com');
    console.log('   🔑 Password: client123');

    // Insert brands
    const createdBrands = await Brand.insertMany(brands);
    console.log(`✅ Created ${createdBrands.length} brands`);

    // Create vehicles
    const vehicles = [
      {
        name: 'Apex GT-R',
        brandId: createdBrands[0]._id,
        vehicleModel: 'GT-R Premium',
        year: 2024,
        basePrice: 89000,
        price: 89000,
        modelUrl: '/models/apex-gt-r.glb',
        thumbnail: '🏎️',
        description: 'Ultra-high-performance supercar with 800hp twin-turbocharged engine',
        engine: 'Twin-Turbo V6',
        horsepower: 800,
        torque: 700,
        acceleration: 2.8,
        topSpeed: 205,
        specs: {
          engine: 'Twin-Turbo V6',
          horsepower: 800,
          torque: 700,
          zeroToSixty: 2.8,
        },
      },
      {
        name: 'Velocity RS',
        brandId: createdBrands[1]._id,
        vehicleModel: 'RS Sport',
        year: 2024,
        basePrice: 95000,
        price: 95000,
        modelUrl: '/models/velocity-rs.glb',
        thumbnail: '🏁',
        description: 'Track-focused racing vehicle with aerodynamic design',
        engine: 'Flat-Plane V8',
        horsepower: 850,
        torque: 750,
        acceleration: 2.7,
        topSpeed: 220,
        specs: {
          engine: 'Flat-Plane V8',
          horsepower: 850,
          torque: 750,
          zeroToSixty: 2.7,
        },
      },
      {
        name: 'EliteForge Classico',
        brandId: createdBrands[2]._id,
        vehicleModel: 'Classico Limited',
        year: 2024,
        basePrice: 125000,
        price: 125000,
        modelUrl: '/models/elite-classico.glb',
        thumbnail: '👑',
        description: 'Handcrafted masterpiece combining classic elegance with modern technology',
        engine: 'Naturally Aspirated V12',
        horsepower: 620,
        torque: 580,
        acceleration: 3.5,
        topSpeed: 195,
        specs: {
          engine: 'Naturally Aspirated V12',
          horsepower: 620,
          torque: 580,
          zeroToSixty: 3.5,
        },
      },
      {
        name: 'QuantumDrive X1',
        brandId: createdBrands[3]._id,
        vehicleModel: 'X1 Autonomous',
        year: 2024,
        basePrice: 78000,
        price: 78000,
        modelUrl: '/models/quantum-x1.glb',
        thumbnail: '⚙️',
        description: 'Electric vehicle with Level 3 autonomous capabilities',
        engine: 'Electric Motor Quad-Rotor',
        horsepower: 600,
        torque: 1000,
        acceleration: 3.2,
        topSpeed: 180,
        specs: {
          engine: 'Electric Motor Quad-Rotor',
          horsepower: 600,
          torque: 1000,
          zeroToSixty: 3.2,
        },
      },
    ];

    const createdVehicles = await Vehicle.insertMany(vehicles);
    console.log(`✅ Created ${createdVehicles.length} vehicles`);

    // Create customization assets
    const assets = [
      {
        name: 'Metallic Sapphire Blue',
        category: 'paint',
        description: 'Premium metallic paint with depth and luster',
        price: 2500,
        image: '🔵',
        compatibility: createdVehicles.map(v => v._id),
      },
      {
        name: 'Carbon Black Pearl',
        category: 'paint',
        description: 'Deep black with subtle pearl finish',
        price: 3000,
        image: '⚫',
        compatibility: [createdVehicles[0]._id, createdVehicles[1]._id, createdVehicles[2]._id],
      },
      {
        name: '20-inch Forged Titanium Wheels',
        category: 'wheels',
        description: 'Ultra-lightweight forged wheels with directional design',
        price: 5500,
        image: '🛞',
        compatibility: [createdVehicles[0]._id, createdVehicles[1]._id, createdVehicles[3]._id],
      },
      {
        name: '21-inch Carbon Fiber Wheels',
        category: 'wheels',
        description: 'Premium carbon fiber construction for maximum performance',
        price: 7200,
        image: '⚫',
        compatibility: [createdVehicles[0]._id, createdVehicles[2]._id],
      },
      {
        name: 'Premium Leather Interior',
        category: 'interior',
        description: 'Hand-stitched premium leather with ambient lighting',
        price: 8000,
        image: '🪑',
        compatibility: createdVehicles.map(v => v._id),
      },
      {
        name: 'Sport Suspension Kit',
        category: 'performance',
        description: 'Adjustable coilovers with motorsport heritage',
        price: 4500,
        image: '🔧',
        compatibility: [createdVehicles[0]._id, createdVehicles[1]._id],
      },
      {
        name: 'Carbon Fiber Body Kit',
        category: 'exterior',
        description: 'Complete aerodynamic enhancement package',
        price: 12000,
        image: '🏗️',
        compatibility: [createdVehicles[0]._id, createdVehicles[1]._id],
      },
      {
        name: 'ECU Tune Performance Package',
        category: 'performance',
        description: '+50hp with custom ECU reprogramming',
        price: 3200,
        image: '💻',
        compatibility: [createdVehicles[0]._id, createdVehicles[1]._id, createdVehicles[3]._id],
      },
    ];

    const createdAssets = await CustomizationAsset.insertMany(assets);
    console.log(`✅ Created ${createdAssets.length} customization assets`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Users: 2 (1 admin, 1 client)`);
    console.log(`   - Brands: ${createdBrands.length}`);
    console.log(`   - Vehicles: ${createdVehicles.length}`);
    console.log(`   - Assets: ${createdAssets.length}`);
    console.log('\n🔐 Admin Credentials:');
    console.log('   📧 Email: admin@autoforge.com');
    console.log('   🔑 Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
