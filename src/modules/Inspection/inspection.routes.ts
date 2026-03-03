import express from "express";
import methodNotAllowed from "../../middleware/methodNotAllowed.js";
// import { ConsultationController } from "./consultation.controller.js";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../../middleware/validateSchema.js";
import Inspection from "./Inspection.model.js";
// import { ConsultationSchemas } from "./consultation.schema.js";
// import { isAuth } from "../../middleware/auth.js"; // Uncomment if you want to protect admin routes

// import { ConsultationSchemas } from "./consultation.schema.js";
const router = express.Router();

// Public routes (for landing page - anyone can submit consultation)

router.get("/", async (req: any, res: any) => {
  try {
    const inspections = await Inspection.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: inspections });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /inspection - Book a new inspection
router.post("/", async (req: any, res: any) => {
  try {
    const { email, name, phone, source } = req.body;
    const inspection = await Inspection.create({ email, name, phone, source });
    res.status(201).json({ success: true, data: inspection });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
