import { User } from "../models/Usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { saltRounds } from "../config/config.js";
import { catchAsyncError } from "../middleware/asyncErrorHandler.js";
import CustomError from "../Utils/customError.js";

export const registerUser = catchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return next(new CustomError("User Already Exist", 402));
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = User.create({
    email,
    username,
    password: hashedPassword,
  });
  res.status(200).json({
    statusCode: "200",
    status: success,
    message: "User created",
    payload: { user },
  });
});

export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const checkEmail = await User.findOne({ email });
  if (!checkEmail) {
    return res.status(402).json({ message: "User Not Found" });
  }

  const passwordMatch = await bcrypt.compare(user.password, password);
  if (!passwordMatch) {
    return next(new CustomError("Password not matched", 400));
  }
  const token = jwt.sign({ user: user._id }, SecretKey, {
    expiresIn: "1h",
  });

  res.status(200).json({
    statusCode: 200,
    status: success,
    message: "User Logged In Successfully",
    payload: { token },
  });
});
