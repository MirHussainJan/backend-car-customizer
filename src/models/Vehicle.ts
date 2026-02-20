import mongoose, { Schema, Document } from 'mongoose';

export interface IVehicle {
  name: string;
  brandId: mongoose.Types.ObjectId;
  vehicleModel: string;
  year: number;
  basePrice: number;
  price: number;
  modelUrl: string;
  thumbnail: string;
  description: string;
  engine?: string;
  horsepower?: number;
  torque?: number;
  acceleration?: number;
  topSpeed?: number;
  specs: {
    engine: string;
    horsepower: number;
    torque: number;
    zeroToSixty: number;
  };
  customModelUrl?: string;
  customizations?: {
    colors?: Record<string, string>;
    selectedWheel?: number;
    selectedSpoiler?: number;
  };
}

export type IVehicleDocument = IVehicle & Document;

const vehicleSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Vehicle name is required'],
      trim: true,
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: [true, 'Brand ID is required'],
    },
    vehicleModel: {
      type: String,
      required: [true, 'Model is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: 1900,
      max: 2100,
    },
    basePrice: {
      type: Number,
      required: [true, 'Base price is required'],
      min: 0,
    },
    price: {
      type: Number,
      required: false,
    },
    modelUrl: {
      type: String,
      required: [true, 'Model URL is required'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail is required'],
      default: '🏎️',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    engine: {
      type: String,
      required: false,
    },
    horsepower: {
      type: Number,
      required: false,
      min: 0,
    },
    torque: {
      type: Number,
      required: false,
      min: 0,
    },
    acceleration: {
      type: Number,
      required: false,
      min: 0,
    },
    topSpeed: {
      type: Number,
      required: false,
      min: 0,
    },
    specs: {
      engine: {
        type: String,
        required: [true, 'Engine spec is required'],
      },
      horsepower: {
        type: Number,
        required: [true, 'Horsepower spec is required'],
        min: 0,
      },
      torque: {
        type: Number,
        required: [true, 'Torque spec is required'],
        min: 0,
      },
      zeroToSixty: {
        type: Number,
        required: [true, '0-60 time is required'],
        min: 0,
      },
    },
    customModelUrl: {
      type: String,
      required: false,
    },
    customizations: {
      colors: {
        type: Map,
        of: String,
        required: false,
      },
      selectedWheel: {
        type: Number,
        required: false,
      },
      selectedSpoiler: {
        type: Number,
        required: false,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc: any, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        // Also transform brandId if it's populated
        if (ret.brandId && typeof ret.brandId === 'object') {
          ret.brandId = ret.brandId.id || ret.brandId._id?.toString() || ret.brandId;
        } else if (ret.brandId) {
          ret.brandId = ret.brandId.toString();
        }
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (_doc: any, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        // Also transform brandId if it's populated
        if (ret.brandId && typeof ret.brandId === 'object') {
          ret.brandId = ret.brandId.id || ret.brandId._id?.toString() || ret.brandId;
        } else if (ret.brandId) {
          ret.brandId = ret.brandId.toString();
        }
        return ret;
      },
    },
  }
);

// Middleware to sync price and basePrice
vehicleSchema.pre('save', function (next) {
  if (this.basePrice && !this.price) {
    this.price = this.basePrice;
  }
  next();
});

export const Vehicle = mongoose.model<IVehicleDocument>('Vehicle', vehicleSchema);
