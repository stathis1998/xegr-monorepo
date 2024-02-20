import express from "express";

import { getPropertyTypes } from "../controllers/propertyTypeController";

const router = express.Router();

router.get("/", getPropertyTypes);

export default router;
