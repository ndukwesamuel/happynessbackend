// import Consultation, { IConsultation } from "./consultation.model.js";
import { ApiError, ApiSuccess } from "../../utils/responseHandler.js";
import { Types } from "mongoose";
import { mailService } from "../../services/mail.service.js";
import Consultation from "./Consultation.model.js";

export class ConsultationService {
  // Create new consultation request
  static async createConsultation(consultationData: Partial<any>) {
    const consultation = new Consultation(consultationData);
    await consultation.save();

    // TODO: Send notification email to admin
    // await mailService.sendConsultationNotification(consultationData);

    return ApiSuccess.created(
      "Consultation request submitted successfully. We will contact you within 24-48 hours.",
      { consultation },
    );
  }

  // Get all consultations (with optional filters)
  static async getAllConsultations(filters?: {
    status?: string;
    email?: string;
    propertyType?: string;
  }) {
    const query: any = {};

    if (filters?.status) {
      query.status = filters.status;
    }

    if (filters?.email) {
      query.email = { $regex: filters.email, $options: "i" }; // Case-insensitive search
    }

    if (filters?.propertyType) {
      query.propertyType = filters.propertyType;
    }

    const consultations = await Consultation.find(query)
      .populate("propertyId", "title price location") // Populate property details if exists
      .sort({ createdAt: -1 });

    return ApiSuccess.ok("Consultations retrieved successfully", {
      consultations,
    });
  }

  // Get pending consultations only
  static async getPendingConsultations() {
    const consultations = await Consultation.find({ status: "pending" })
      .populate("propertyId", "title price location")
      .sort({ createdAt: -1 });

    return ApiSuccess.ok("Pending consultations retrieved successfully", {
      consultations,
    });
  }

  // Get single consultation by ID
  static async getConsultationById(consultationId: string) {
    if (!Types.ObjectId.isValid(consultationId)) {
      throw ApiError.badRequest("Invalid consultation ID");
    }

    const consultation = await Consultation.findById(consultationId).populate(
      "propertyId",
      "title price location images",
    );

    if (!consultation) {
      throw ApiError.notFound("Consultation not found");
    }

    return ApiSuccess.ok("Consultation retrieved successfully", {
      consultation,
    });
  }

  // Update consultation status (approve/reject)
  static async updateConsultationStatus(
    consultationId: string,
    status: "approved" | "rejected",
  ) {
    if (!Types.ObjectId.isValid(consultationId)) {
      throw ApiError.badRequest("Invalid consultation ID");
    }

    if (!["approved", "rejected"].includes(status)) {
      throw ApiError.badRequest(
        "Invalid status. Must be 'approved' or 'rejected'",
      );
    }

    const consultation = await Consultation.findByIdAndUpdate(
      consultationId,
      { status },
      { new: true, runValidators: true },
    );

    if (!consultation) {
      throw ApiError.notFound("Consultation not found");
    }

    // TODO: Send email notification to client about status change
    // if (status === "approved") {
    //   await mailService.sendConsultationApproval(consultation.email, consultation);
    // } else {
    //   await mailService.sendConsultationRejection(consultation.email, consultation);
    // }

    return ApiSuccess.ok(`Consultation ${status} successfully`, {
      consultation,
    });
  }

  // Delete consultation
  static async deleteConsultation(consultationId: string) {
    if (!Types.ObjectId.isValid(consultationId)) {
      throw ApiError.badRequest("Invalid consultation ID");
    }

    const consultation = await Consultation.findByIdAndDelete(consultationId);

    if (!consultation) {
      throw ApiError.notFound("Consultation not found");
    }

    return ApiSuccess.ok("Consultation deleted successfully", { consultation });
  }

  // Get consultation statistics
  static async getConsultationStats() {
    const totalConsultations = await Consultation.countDocuments();
    const pendingConsultations = await Consultation.countDocuments({
      status: "pending",
    });
    const approvedConsultations = await Consultation.countDocuments({
      status: "approved",
    });
    const rejectedConsultations = await Consultation.countDocuments({
      status: "rejected",
    });

    const consultationsByPropertyType = await Consultation.aggregate([
      {
        $group: {
          _id: "$propertyType",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get recent consultations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentConsultations = await Consultation.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    });

    return ApiSuccess.ok("Consultation statistics retrieved successfully", {
      stats: {
        totalConsultations,
        pendingConsultations,
        approvedConsultations,
        rejectedConsultations,
        recentConsultations,
        byPropertyType: consultationsByPropertyType,
      },
    });
  }

  // Search consultations by name or email
  static async searchConsultations(searchTerm: string) {
    const consultations = await Consultation.find({
      $or: [
        { fullName: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { propertyInterest: { $regex: searchTerm, $options: "i" } },
      ],
    })
      .populate("propertyId", "title price location")
      .sort({ createdAt: -1 });

    return ApiSuccess.ok("Search results retrieved successfully", {
      consultations,
    });
  }
}

export default ConsultationService;
