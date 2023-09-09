import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
const app = express();
import { PORT, MONGO_URL } from "./config/config.js";
import CustomError from "./Utils/customError.js";
import globalErrorHandler from "./middleware/errorMiddleware.js";
import dotenv from "dotenv"

app.use(express.json());
app.use(cors());

dotenv.config

app.use("/auth", userRoutes);
app.use("/blog", blogRoutes);


app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the Server`,
    404
  );
  next(err);
});

app.use(globalErrorHandler);

mongoose
  .connect(MONGO_URL)
  .then(console.log("The Database is Connected"))
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`The app is listening to ${PORT}`);
});
