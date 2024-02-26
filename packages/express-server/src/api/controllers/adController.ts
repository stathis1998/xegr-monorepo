import { Request, Response } from "express";

import Ad from "../models/adModel";
import sequelize from "../../config/db";
import { searchPhotos } from "../../utils/imageUtils";
import Image from "../models/imageModel";

export async function getAds(req: Request, res: Response) {
  const { id, limit } = req.params;

  if (id) {
    try {
      const ad = await Ad.findByPk(id, {
        include: {
          model: Image,
          as: "images",
        },
      });

      if (!ad) {
        return res.status(404).json({ message: "Ad not found" });
      }

      res.status(200).json({ message: "Successfully retrieved ad", data: ad });
    } catch (error) {
      res.status(500).json({ message: "Error getting ad", error });
      console.error("Error getting ad:", error);
    }

    return;
  }

  try {
    const ads = await Ad.findAll({
      limit: limit ? Number(limit) : undefined,
      include: {
        model: Image,
        as: "images",
      },
    });
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
      !propertyType ||
      !address ||
      !userId ||
      !placeId ||
      !listingType
    ) {
      return res.status(400).json({
        message:
          "Title, price, property type, address, listing type, and place are required",
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

    const imagesCount = Math.floor(Math.random() * 5) + 1;

    const t = await sequelize.transaction();

    try {
      const newAd = await Ad.create(
        {
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
        },
        { transaction: t }
      );

      const images = [
        ...(await searchPhotos("house", 1)),
        ...(await searchPhotos("inside of house", imagesCount - 1)),
      ];

      await Image.bulkCreate(
        images.map((image: any) => ({
          width: image.width,
          height: image.height,
          url: image.src.original,
          alt: image.alt,
          adId: newAd.id,
        })),
        { transaction: t }
      );

      await t.commit();
      res.status(201).json({ message: "Ad created", data: newAd });
    } catch (error) {
      await t.rollback();
      console.error("Error in transaction:", error);
      res.status(500).json({ message: "Error creating ad", error });
    }
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

    const images = await Image.findAll({ where: { adId: id } });
    for (const image of images) {
      await image.destroy();
    }

    await ad.destroy();

    res.status(200).json({ message: "Ad deleted" });
  } catch (error) {
    console.error("Error deleting ad:", error);
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
      listingType,
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
    if (listingType !== undefined) ad.listingType = listingType;
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
