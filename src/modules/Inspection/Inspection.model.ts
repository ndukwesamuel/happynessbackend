import { Schema, model, Types } from "mongoose";

export interface IInspection {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  source?: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}

const inspectionSchema = new Schema<IInspection>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    source: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

inspectionSchema.index({ status: 1, createdAt: -1 });
inspectionSchema.index({ email: 1 });

const Inspection = model<IInspection>("Inspection", inspectionSchema);

export default Inspection;
