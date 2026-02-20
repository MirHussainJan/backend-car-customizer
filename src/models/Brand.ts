import mongoose, { Schema, Document } from 'mongoose';

export interface IBrand {
  name: string;
  logo: string;
  description: string;
  founded: number;
  foundedYear: number;
  country: string;
}

export type IBrandDocument = IBrand & Document;

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand name is required'],
      trim: true,
      unique: true,
    },
    logo: {
      type: String,
      required: [true, 'Brand logo is required'],
      default: '🏛️',
    },
    description: {
      type: String,
      required: [true, 'Brand description is required'],
      trim: true,
    },
    founded: {
      type: Number,
      required: [true, 'Founded year is required'],
    },
    foundedYear: {
      type: Number,
      required: false,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
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

// Middleware to sync founded and foundedYear
brandSchema.pre('save', function (next) {
  if (this.founded && !this.foundedYear) {
    this.foundedYear = this.founded;
  }
  if (this.foundedYear && !this.founded) {
    this.founded = this.foundedYear;
  }
  next();
});

export const Brand = mongoose.model<IBrandDocument>('Brand', brandSchema);
