import { Request, Response } from "express";

import ListingType from "../models/listingTypeModel";

export async function getListingTypes(req: Request, res: Response) {
  try {
    const listingTypes = await ListingType.findAll();
    res
      .status(200)
      .json({
        message: "Successfully retrieved listing types",
        data: listingTypes,
      });
  } catch (error) {
    res.status(500).json({ message: "Error getting listing types", error });
  }
}
