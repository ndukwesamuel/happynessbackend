import type { Request, Response } from "express";
import ConsultationService from "./Consultation.service";
// import { ConsultationService } from "./consultation.service.js";

export class ConsultationController {
  // Create consultation request
  static async createConsultation(req: Request, res: Response) {
    const consultationData = req.body;
    const result =
      await ConsultationService.createConsultation(consultationData);
    res.status(201).json(result);
  }

  // Get all consultations (admin - with filters)
  static async getAllConsultations(req: Request, res: Response) {
    const { status, email, propertyType } = req.query;
    const filters = {
      status: status as string,
      email: email as string,
      propertyType: propertyType as string,
    };
    const result = await ConsultationService.getAllConsultations(filters);
    res.status(200).json(result);
  }

  // Get pending consultations only
  static async getPendingConsultations(req: Request, res: Response) {
    const result = await ConsultationService.getPendingConsultations();
    res.status(200).json(result);
  }

  // Get single consultation by ID
  static async getConsultationById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await ConsultationService.getConsultationById(id);
    res.status(200).json(result);
  }

  // Update consultation status (approve/reject)
  static async updateConsultationStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;
    const result = await ConsultationService.updateConsultationStatus(
      id,
      status,
    );
    res.status(200).json(result);
  }

  // Delete consultation
  static async deleteConsultation(req: Request, res: Response) {
    const { id } = req.params;
    const result = await ConsultationService.deleteConsultation(id);
    res.status(200).json(result);
  }

  // Get consultation statistics
  static async getConsultationStats(req: Request, res: Response) {
    const result = await ConsultationService.getConsultationStats();
    res.status(200).json(result);
  }

  // Search consultations
  static async searchConsultations(req: Request, res: Response) {
    const { q } = req.query;
    const result = await ConsultationService.searchConsultations(q as string);
    res.status(200).json(result);
  }
}

export default ConsultationController;
