import { Schema, model, Types } from "mongoose";

export interface IConsultation {
  _id?: Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  propertyInterest: string;
  propertyType: string;
  propertyId?: Types.ObjectId; // Reference to Property if booked from details page
  preferredDate?: Date;
  message?: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}

const consultationSchema = new Schema<IConsultation>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
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
    propertyInterest: {
      type: String,
      required: [true, "Property interest is required"],
      trim: true,
    },
    propertyType: {
      type: String,
      required: [true, "Property type is required"],
      trim: true,
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: false,
    },
    preferredDate: {
      type: Date,
      required: false,
    },
    message: {
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

// Index for faster queries
consultationSchema.index({ status: 1, createdAt: -1 });
consultationSchema.index({ email: 1 });

const Consultation = model<IConsultation>("Consultation", consultationSchema);

export default Consultation;
