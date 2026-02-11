import { Schema, model, Types } from "mongoose";

export interface IProperty {
  _id?: Types.ObjectId;
  title: string;
  location: string;
  size: string;
  type: string; // Residential, Land & Plots, Commercial, Palm Plantation, etc.
  category: string; // Real Estate or Agriculture
  price: string;
  status: "active" | "inactive";
  images: string[]; // Array of image URLs
  features: string[];
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const propertySchema = new Schema<IProperty>(
  {
    title: {
      type: String,
      required: [true, "Property title is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    size: {
      type: String,
      required: [true, "Size is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Property type is required"],
      enum: [
        "Residential",
        "Land & Plots",
        "Commercial",
        "Palm Plantation",
        "Farm Management",
        "Bulk Export",
      ],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Real Estate", "Agriculture"],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0;
        },
        message: "At least one image is required",
      },
    },
    features: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster queries
propertySchema.index({ status: 1, category: 1 });
propertySchema.index({ type: 1 });

const Property = model<IProperty>("Property", propertySchema);

export default Property;
