import express from "express";
import cors from "cors";

import sequelize from "./config/db";
import { seed } from "../db/seeder";

import { tokenValidationMiddleware } from "./api/middlewares/authMiddlewares";
import axios from "axios";

import authRoutes from "./api/routes/authRoutes";
import adRoutes from "./api/routes/adRoutes";
import listingTypeRoutes from "./api/routes/listingTypeRoutes";
import propertyTypeRoutes from "./api/routes/propertyTypeRoutes";
import imageRoutes from "./api/routes/imageRoutes";

import { runAssosiacion } from "./config/associations";

const app = express();

const port = process.env.PORT;
const corsOrigin = process.env.CORS_ORIGIN;

if (!port) {
  throw new Error("Port is not defined");
}

if (!corsOrigin) {
  throw new Error("CORS origin is not defined");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: corsOrigin,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/ads", tokenValidationMiddleware, adRoutes);
app.use("/api/listing-types", tokenValidationMiddleware, listingTypeRoutes);
app.use("/api/property-types", tokenValidationMiddleware, propertyTypeRoutes);
app.use("/api/images", tokenValidationMiddleware, imageRoutes);

app.get("/api/places", tokenValidationMiddleware, async (req, res) => {
  const { input } = req.query;

  if (!input) {
    res.status(400).json({ message: "Input is required" });
    return;
  }

  const endpoint = process.env.XEGR_ENDPOINT;
  if (!endpoint) {
    res.status(500).json({ message: "Xegr endpoint is not defined" });
    return;
  }

  try {
    const response = await axios.get(endpoint, {
      params: { input },
    });

    res.status(200).json({
      message: "Successfully fetched xegr endpoint",
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error getting xegr endpoint", error });
  }
});

sequelize
  .sync()
  // .sync({ force: true }) // Uncomment this line to force sync the database on initial setup if needed
  .then(() => {
    console.log("Database synchronized.");

    runAssosiacion();
    // seed(); // Uncomment this line to seed the database on initial setup if needed

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
