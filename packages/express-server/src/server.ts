import express from "express";
import cors from "cors";

import sequelize from "./config/db";
import { seed } from "../db/seeder";

import authRoutes from "./api/routes/authRoutes";
import adRoutes from "./api/routes/adRoutes";
import { tokenValidationMiddleware } from "./api/middlewares/authMiddlewares";

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
