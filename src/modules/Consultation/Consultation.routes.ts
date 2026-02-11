import express from "express";
import methodNotAllowed from "../../middleware/methodNotAllowed.js";
// import { ConsultationController } from "./consultation.controller.js";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../../middleware/validateSchema.js";
import ConsultationSchemas from "./Consultation.schema.js";
import ConsultationController from "./Consultation.controller.js";
// import { ConsultationSchemas } from "./consultation.schema.js";
// import { isAuth } from "../../middleware/auth.js"; // Uncomment if you want to protect admin routes

// import { ConsultationSchemas } from "./consultation.schema.js";
const router = express.Router();

// Public routes (for landing page - anyone can submit consultation)
router
  .route("/")
  .post(
    validateBody(ConsultationSchemas.createConsultation),
    ConsultationController.createConsultation,
  ) // Submit consultation request

  .get(ConsultationController.getAllConsultations) // Get all consultations with filters
  .all(methodNotAllowed);

// Admin routes (protected - uncomment isAuth middleware when ready)
// router
//   .route("/admin/all")
//   .get(
//     // isAuth, // Uncomment to protect
//     ConsultationController.getAllConsultations,
//   ) // Get all consultations with filters
//   .all(methodNotAllowed);

// router
//   .route("/admin/pending")
//   .get(
//     // isAuth, // Uncomment to protect
//     ConsultationController.getPendingConsultations,
//   ) // Get only pending consultations
//   .all(methodNotAllowed);

// router
//   .route("/admin/stats")
//   .get(
//     // isAuth, // Uncomment to protect
//     ConsultationController.getConsultationStats,
//   ) // Get consultation statistics
//   .all(methodNotAllowed);

// router
//   .route("/admin/search")
//   .get(
//     // isAuth, // Uncomment to protect
//     validateQuery(ConsultationSchemas.searchQuery),
//     ConsultationController.searchConsultations,
//   ) // Search consultations
//   .all(methodNotAllowed);

// router
//   .route("/admin/:id")
//   .get(
//     // isAuth, // Uncomment to protect
//     validateParams(ConsultationSchemas.consultationId),
//     ConsultationController.getConsultationById,
//   ) // Get single consultation
//   .delete(
//     // isAuth, // Uncomment to protect
//     validateParams(ConsultationSchemas.consultationId),
//     ConsultationController.deleteConsultation,
//   ) // Delete consultation
//   .all(methodNotAllowed);

// router
//   .route("/admin/:id/status")
//   .patch(
//     // isAuth, // Uncomment to protect
//     validateParams(ConsultationSchemas.consultationId),
//     validateBody(ConsultationSchemas.updateConsultationStatus),
//     ConsultationController.updateConsultationStatus,
//   ) // Update consultation status (approve/reject)
//   .all(methodNotAllowed);

export default router;
