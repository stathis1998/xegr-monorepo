import { Request, Response } from "express";

import Ad from "../models/adModel";

export async function getAds(req: Request, res: Response) {
  try {
    const ads = await Ad.findAll();
    res.status(200).json({ message: "Successfully retrieved ads", data: ads });
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
      listingType,
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
      !placeId ||
      !listingType
    ) {
      return res.status(400).json({
        message:
          "Title, price, propertyType, address, bedrooms, bathrooms, area, userId, listingType, and placeId are required",
      });
    }

    if (
      typeof Number(price) !== "number" ||
      typeof Number(bedrooms) !== "number" ||
      typeof Number(bathrooms) !== "number" ||
      typeof Number(area) !== "number"
    ) {
      return res.status(400).json({
        message: "Price, bedrooms, bathrooms, and area must be numbers",
      });
    }

    const newAd = await Ad.create({
      title,
      description,
      price,
      propertyType,
      listingType,
      address,
      bedrooms,
      bathrooms,
      area,
      userId,
      placeId,
    });

    res.status(201).json({ message: "Ad created", data: newAd });
  } catch (error) {
    res.status(500).json({ message: "Error creating ad", error });
  }
}

export async function deleteAd(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Ad id is required" });
    }

    const ad = await Ad.findByPk(id);

    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    await ad.destroy();

    res.status(200).json({ message: "Ad deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ad", error });
  }
}

export async function updateAd(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      propertyType,
      address,
      bedrooms,
      bathrooms,
      area,
      placeId,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Ad id is required" });
    }

    const ad = await Ad.findByPk(id);

    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    if (title !== undefined) ad.title = title;
    if (description !== undefined) ad.description = description;
    if (price !== undefined && typeof price === "number") ad.price = price;
    if (propertyType !== undefined) ad.propertyType = propertyType;
    if (address !== undefined) ad.address = address;
    if (bedrooms !== undefined && typeof price === "number")
      ad.bedrooms = bedrooms;
    if (bathrooms !== undefined && typeof price === "number")
      ad.bathrooms = bathrooms;
    if (area !== undefined && typeof price === "number") ad.area = area;
    if (placeId !== undefined) ad.placeId = placeId;

    await ad.save();

    res.status(200).json({ message: "Ad updated", ad });
  } catch (error) {
    res.status(500).json({ message: "Error updating ad", error });
  }
}
