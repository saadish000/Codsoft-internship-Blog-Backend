import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
const app = express();
import { PORT, MONGO_URL } from "./config/config.js";

app.use(express.json());
app.use(cors());

app.use("/auth", userRoutes);
app.use("/blog", blogRoutes);

mongoose
  .connect(MONGO_URL)
  .then(console.log("The Database is Connected"))
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`The app is listening to ${PORT}`);
});
