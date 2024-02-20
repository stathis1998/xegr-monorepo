import { Request, Response } from "express";

import PropertyType from "../models/propertyTypeModel";

export async function getPropertyTypes(req: Request, res: Response) {
  try {
    const propertyTypes = await PropertyType.findAll();
    res.status(200).json(propertyTypes);
  } catch (error) {
    res.status(500).json({ message: "Error getting property types", error });
  }
}
