import express from "express";

import { getListingTypes } from "../controllers/listingTypeController";

const router = express.Router();

router.get("/", getListingTypes);

export default router;
