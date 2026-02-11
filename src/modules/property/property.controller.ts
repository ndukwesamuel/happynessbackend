import type { Request, Response } from "express";
import { PropertyService } from "./property.service.js";

export class PropertyController {
  // Create property
  static async createProperty(req: Request, res: Response) {
    const propertyData = req.body;
    const result = await PropertyService.createProperty(propertyData);
    res.status(201).json(result);
  }

  // Get all properties (admin - with filters)
  static async getAllProperties(req: Request, res: Response) {
    const { status, category, type } = req.query;
    const filters = {
      status: status as string,
      category: category as string,
      type: type as string,
    };
    const result = await PropertyService.getAllProperties(filters);
    res.status(200).json(result);
  }

  // Get active properties only (public)
  static async getActiveProperties(req: Request, res: Response) {
    const result = await PropertyService.getActiveProperties();
    res.status(200).json(result);
  }

  // Get single property by ID
  static async getPropertyById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await PropertyService.getPropertyById(id);
    res.status(200).json(result);
  }

  // Update property
  static async updateProperty(req: Request, res: Response) {
    const { id } = req.params;
    const updateData = req.body;
    const result = await PropertyService.updateProperty(id, updateData);
    res.status(200).json(result);
  }

  // Toggle property status
  static async togglePropertyStatus(req: Request, res: Response) {
    const { id } = req.params;
    const result = await PropertyService.togglePropertyStatus(id);
    res.status(200).json(result);
  }

  // Delete property
  static async deleteProperty(req: Request, res: Response) {
    const { id } = req.params;
    const result = await PropertyService.deleteProperty(id);
    res.status(200).json(result);
  }

  // Get property statistics
  static async getPropertyStats(req: Request, res: Response) {
    const result = await PropertyService.getPropertyStats();
    res.status(200).json(result);
  }
}

export default PropertyController;
