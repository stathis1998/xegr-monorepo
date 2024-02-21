import express from "express";

import { register, login, validate } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/validate", validate);

export default router;
