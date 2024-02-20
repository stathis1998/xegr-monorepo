import express from "express";

import { createAd, getAds } from "../controllers/adController";

const router = express.Router();

router.get("/", getAds);
router.post("/create", createAd);

export default router;
