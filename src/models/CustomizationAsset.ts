import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomizationAsset {
  name: string;
  category: 'paint' | 'wheels' | 'interior' | 'exterior' | 'performance';
  description: string;
  price: number;
  image: string;
  compatibility: mongoose.Types.ObjectId[];
}

export type ICustomizationAssetDocument = ICustomizationAsset & Document;

const customizationAssetSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Asset name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['paint', 'wheels', 'interior', 'exterior', 'performance'],
        message: '{VALUE} is not a valid category',
      },
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      default: '🎨',
    },
    compatibility: [{
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
    }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc: any, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (_doc: any, ret: any) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const CustomizationAsset = mongoose.model<ICustomizationAssetDocument>(
  'CustomizationAsset',
  customizationAssetSchema
);
