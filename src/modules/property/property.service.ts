// import Property, { IProperty } from "./property.model.js";
import { ApiError, ApiSuccess } from "../../utils/responseHandler.js";
import { Types } from "mongoose";
import Property from "./property.model.js";

export class PropertyService {
  // Create new property
  static async createProperty(propertyData: Partial<any>) {
    const property = new Property(propertyData);
    await property.save();

    return ApiSuccess.created("Property created successfully", { property });
  }

  // Get all properties (with optional filters)
  static async getAllProperties(filters?: {
    status?: string;
    category?: string;
    type?: string;
  }) {
    const query: any = {};

    if (filters?.status) {
      query.status = filters.status;
    }

    if (filters?.category) {
      query.category = filters.category;
    }

    if (filters?.type) {
      query.type = filters.type;
    }

    const properties = await Property.find(query).sort({ createdAt: -1 });

    return ApiSuccess.ok("Properties retrieved successfully", { properties });
  }

  // Get active properties only (for public landing page)
  static async getActiveProperties() {
    const properties = await Property.find({ status: "active" }).sort({
      createdAt: -1,
    });

    return ApiSuccess.ok("Active properties retrieved successfully", {
      properties,
    });
  }

  // Get single property by ID
  static async getPropertyById(propertyId: string) {
    if (!Types.ObjectId.isValid(propertyId)) {
      throw ApiError.badRequest("Invalid property ID");
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      throw ApiError.notFound("Property not found");
    }

    return ApiSuccess.ok("Property retrieved successfully", { property });
  }

  // Update property
  static async updateProperty(
    propertyId: string,
    updateData: Partial<IProperty>,
  ) {
    if (!Types.ObjectId.isValid(propertyId)) {
      throw ApiError.badRequest("Invalid property ID");
    }

    const property = await Property.findByIdAndUpdate(propertyId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!property) {
      throw ApiError.notFound("Property not found");
    }

    return ApiSuccess.ok("Property updated successfully", { property });
  }

  // Toggle property status (active/inactive)
  static async togglePropertyStatus(propertyId: string) {
    if (!Types.ObjectId.isValid(propertyId)) {
      throw ApiError.badRequest("Invalid property ID");
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      throw ApiError.notFound("Property not found");
    }

    property.status = property.status === "active" ? "inactive" : "active";
    await property.save();

    return ApiSuccess.ok("Property status updated successfully", { property });
  }

  // Delete property
  static async deleteProperty(propertyId: string) {
    if (!Types.ObjectId.isValid(propertyId)) {
      throw ApiError.badRequest("Invalid property ID");
    }

    const property = await Property.findByIdAndDelete(propertyId);

    if (!property) {
      throw ApiError.notFound("Property not found");
    }

    return ApiSuccess.ok("Property deleted successfully", { property });
  }

  // Get property statistics
  static async getPropertyStats() {
    const totalProperties = await Property.countDocuments();
    const activeProperties = await Property.countDocuments({
      status: "active",
    });
    const inactiveProperties = await Property.countDocuments({
      status: "inactive",
    });

    const propertiesByCategory = await Property.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const propertiesByType = await Property.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    return ApiSuccess.ok("Property statistics retrieved successfully", {
      stats: {
        totalProperties,
        activeProperties,
        inactiveProperties,
        byCategory: propertiesByCategory,
        byType: propertiesByType,
      },
    });
  }
}

export default PropertyService;
