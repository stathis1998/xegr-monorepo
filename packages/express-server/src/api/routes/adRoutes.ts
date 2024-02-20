import express from "express";

import {
  createAd,
  getAds,
  deleteAd,
  updateAd,
} from "../controllers/adController";

const router = express.Router();

router.get("/", getAds);
router.post("/create", createAd);
router.delete("/:id", deleteAd);
router.patch("/:id", updateAd);

export default router;
