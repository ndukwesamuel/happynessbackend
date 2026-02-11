import express from "express";
import methodNotAllowed from "../../middleware/methodNotAllowed.js";
// import { PropertyController } from "./property.controller.js";
import {
  validateBody,
  validateParams,
} from "../../middleware/validateSchema.js";
import PropertySchemas from "./property.schema.js";
import PropertyController from "./property.controller.js";
// import { PropertySchemas } from "./property.schema.js";
// import { isAuth } from "../../middleware/auth.js"; // Uncomment if you want to protect admin routes

const router = express.Router();

// Public routes (for landing page)
router
  .route("/")
  .get(PropertyController.getActiveProperties) // Get only active properties for public

  .all(methodNotAllowed);

// Admin routes (protected - uncomment isAuth middleware when ready)
router
  .route("/admin")
  .get(PropertyController.getAllProperties) // Get all properties with filters
  .post(
    validateBody(PropertySchemas.createProperty),
    PropertyController.createProperty,
  )
  .all(methodNotAllowed);

router
  .route("/:id")
  .get(
    validateParams(PropertySchemas.propertyId),
    PropertyController.getPropertyById,
  ) // Get single property details for public
  .all(methodNotAllowed);

// // Admin routes (protected - uncomment isAuth middleware when ready)
// router
//   .route("/")
//   .get(PropertyController.getAllProperties) // Get all properties with filters
//   .post(
//     // isAuth, // Uncomment to protect
//     validateBody(PropertySchemas.createProperty),
//     PropertyController.createProperty,
//   )
//   .all(methodNotAllowed);

// router
//   .route("/stats")
//   .get(
//     // isAuth, // Uncomment to protect
//     PropertyController.getPropertyStats,
//   )
//   .all(methodNotAllowed);

// router
//   .route("/:id")
//   .get(
//     validateParams(PropertySchemas.propertyId),
//     PropertyController.getPropertyById,
//   )
//   .put(
//     // isAuth, // Uncomment to protect
//     validateParams(PropertySchemas.propertyId),
//     validateBody(PropertySchemas.updateProperty),
//     PropertyController.updateProperty,
//   )
//   .delete(
//     // isAuth, // Uncomment to protect
//     validateParams(PropertySchemas.propertyId),
//     PropertyController.deleteProperty,
//   )
//   .all(methodNotAllowed);

// router
//   .route("/:id/toggle-status")
//   .patch(
//     // isAuth, // Uncomment to protect
//     validateParams(PropertySchemas.propertyId),
//     PropertyController.togglePropertyStatus,
//   )
//   .all(methodNotAllowed);

export default router;
