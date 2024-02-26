import express from "express";

import {
  getImages,
  createImage,
  deleteImage,
} from "../controllers/imageController";

const router = express.Router();

router.get("/:adId", getImages);
router.post("/create", createImage);
router.delete("/:id", deleteImage);

export default router;
