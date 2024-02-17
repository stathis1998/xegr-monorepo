import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT;

if (!port) {
  throw new Error("Port is not defined");
}

/**
 * Enable CORS for all routes
 */
app.use(cors());

export type Data = {
  data: string;
};

app.get("/data", (req, res) => {
  const data: Data = {
    data: "Hello from express server",
  };

  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
