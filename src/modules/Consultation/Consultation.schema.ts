import { z } from "zod";

export class ConsultationSchemas {
  static createConsultation = z
    .object({
      fullName: z
        .string({ required_error: "Full name is required" })
        .min(2, "Full name must be at least 2 characters"),
      email: z
        .string({ required_error: "Email is required" })
        .email("Please provide a valid email address"),
      phone: z
        .string({ required_error: "Phone number is required" })
        .min(10, "Phone number must be at least 10 characters"),
      propertyInterest: z
        .string({ required_error: "Property interest is required" })
        .min(3, "Property interest must be at least 3 characters"),
      propertyType: z.string({ required_error: "Property type is required" }),
      propertyId: z.string().optional(), // Optional property ID reference
      preferredDate: z.string().optional(),
      message: z.string().optional(),
    })
    .strict();

  static updateConsultationStatus = z
    .object({
      status: z.enum(["approved", "rejected"], {
        required_error: "Status is required",
        invalid_type_error: "Status must be either 'approved' or 'rejected'",
      }),
    })
    .strict();

  static consultationId = z.object({
    id: z.string().min(1, "Consultation ID is required"),
  });

  static searchQuery = z.object({
    q: z.string().min(1, "Search query is required"),
  });
}

export default ConsultationSchemas;
