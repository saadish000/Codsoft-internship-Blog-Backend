import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRoutes);

const PORT = 4000;

mongoose
  .connect(
    "mongodb+srv://saadisheikh000:saad1234@cluster0.onnqw0t.mongodb.net/simplecrud?retryWrites=true&w=majority"
  )
  .then(console.log("The Database is Connected"))
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`The app is listening to ${PORT}`);
});
