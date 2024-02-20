import { Request, Response } from "express";

import Ad from "../models/adModel";

export async function getAds(req: Request, res: Response) {
  try {
    const ads = await Ad.findAll();
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: "Error getting ads", error });
  }
}

export async function createAd(req: Request, res: Response) {
  try {
    const {
      title,
      description,
      price,
      propertyType,
      address,
      bedrooms,
      bathrooms,
      area,
      userId,
      placeId,
    } = req.body;

    if (
      !title ||
      !price ||
      !propertyType ||
      !address ||
      !bedrooms ||
      !bathrooms ||
      !area ||
      !userId ||
      !placeId
    ) {
      return res.status(400).json({
        message:
          "Title, price, propertyType, address, bedrooms, bathrooms, area, userId, and placeId are required",
      });
    }

    const newAd = await Ad.create({
      title,
      description,
      price,
      propertyType,
      address,
      bedrooms,
      bathrooms,
      area,
      userId,
      placeId,
    });

    res.status(201).json({ message: "Ad created", newAd });
  } catch (error) {
    res.status(500).json({ message: "Error creating ad", error });
  }
}
