import express from "express";
import cors from "cors";

import sequelize from "./config/db";
import authRoutes from "./api/routes/authRoutes";

const app = express();
const port = process.env.PORT;

if (!port) {
  throw new Error("Port is not defined");
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synchronized.");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
