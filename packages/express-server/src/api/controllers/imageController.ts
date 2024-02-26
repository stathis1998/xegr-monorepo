import { Request, Response } from "express";

import Image from "../models/imageModel";

export async function getImages(req: Request, res: Response) {
  const { adId } = req.params;

  if (!adId) {
    return res.status(400).json({ message: "Ad ID is required" });
  }

  const images = await Image.findAll({ where: { adId } });
  res
    .status(200)
    .json({ message: "Successfully retrieved images", data: images });
}

export async function createImage(req: Request, res: Response) {
  try {
    const { width, height, url, alt, adId } = req.body;

    if (!width || !height || !url || !alt || !adId) {
      return res.status(400).json({
        message: "Width, height, url, alt, and adId are required",
      });
    }

    const newImage = await Image.create({ width, height, url, alt, adId });
    res.status(201).json({ message: "Image created", data: newImage });
  } catch (error) {
    res.status(500).json({ message: "Error creating image", error });
  }
}

export async function deleteImage(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Image ID is required" });
  }

  const deletedImage = await Image.destroy({ where: { id } });
  if (!deletedImage) {
    return res.status(404).json({ message: "Image not found" });
  }

  res.status(200).json({ message: "Image deleted" });
}
