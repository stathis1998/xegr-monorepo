import express from "express";
import cors from "cors";

import sequelize from "./config/db";
import { seed } from "../db/seeder";

import authRoutes from "./api/routes/authRoutes";
import adRoutes from "./api/routes/adRoutes";
import listingTypeRoutes from "./api/routes/listingTypeRoutes";
import propertyTypeRoutes from "./api/routes/propertyTypeRoutes";
import { tokenValidationMiddleware } from "./api/middlewares/authMiddlewares";
import axios from "axios";

const app = express();
const port = process.env.PORT;

if (!port) {
  throw new Error("Port is not defined");
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/ads", tokenValidationMiddleware, adRoutes);
app.use("/api/listing-types", tokenValidationMiddleware, listingTypeRoutes);
app.use("/api/property-types", tokenValidationMiddleware, propertyTypeRoutes);

app.get("/api/xegr-endpoint", async (req, res) => {
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

    res.status(200).json({ places: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error getting xegr endpoint", error });
  }
});

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized.");

    // seed();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
