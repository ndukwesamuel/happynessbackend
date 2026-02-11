import { z } from "zod";

export class PropertySchemas {
  static createProperty = z
    .object({
      title: z
        .string({ required_error: "Property title is required" })
        .min(5, "Title must be at least 5 characters"),
      location: z
        .string({ required_error: "Location is required" })
        .min(3, "Location must be at least 3 characters"),
      size: z.string({ required_error: "Size is required" }),
      type: z.enum(
        [
          "Residential",
          "Land & Plots",
          "Commercial",
          "Palm Plantation",
          "Farm Management",
          "Bulk Export",
        ],
        { required_error: "Property type is required" },
      ),
      category: z.enum(["Real Estate", "Agriculture"], {
        required_error: "Category is required",
      }),
      price: z.string({ required_error: "Price is required" }),
      status: z.enum(["active", "inactive"]).optional().default("active"),
      images: z
        .array(z.string().url("Each image must be a valid URL"))
        .min(1, "At least one image is required"),
      features: z.array(z.string()).optional().default([]),
      description: z.string().optional(),
    })
    .strict();

  static updateProperty = z
    .object({
      title: z
        .string()
        .min(5, "Title must be at least 5 characters")
        .optional(),
      location: z
        .string()
        .min(3, "Location must be at least 3 characters")
        .optional(),
      size: z.string().optional(),
      type: z
        .enum([
          "Residential",
          "Land & Plots",
          "Commercial",
          "Palm Plantation",
          "Farm Management",
          "Bulk Export",
        ])
        .optional(),
      category: z.enum(["Real Estate", "Agriculture"]).optional(),
      price: z.string().optional(),
      status: z.enum(["active", "inactive"]).optional(),
      images: z
        .array(z.string().url("Each image must be a valid URL"))
        .optional(),
      features: z.array(z.string()).optional(),
      description: z.string().optional(),
    })
    .strict();

  static propertyId = z.object({
    id: z.string().min(1, "Property ID is required"),
  });
}

export default PropertySchemas;
