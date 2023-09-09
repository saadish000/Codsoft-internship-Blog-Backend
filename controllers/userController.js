import { User } from "../models/Usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { saltRounds } from "../config/config.js";
import { catchAsyncError } from "../middleware/asyncErrorHandler.js";
import CustomError from "../Utils/customError.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      statusCode: 409,
      status: false,
      message: "User already exists!",
      payload: { user },
    });
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const tokenPayload = { id: user._id, email: user.email };
  const token = jwt.sign(tokenPayload, process.env.Secret_key, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });

  return res.status(200).json({
    statusCode: "200",
    status: true,
    message: "User created",
    payload: {
      token: {
        accessToken: token,
        expiresIn: parseInt(process.env.JWT_EXPIRATION_TIME),
      },
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    },
  });
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      statusCode: 404,
      status: false,
      message: "User does not exist!",
    });
  }

  const isMatch = await bcrypt.compare(user.password, password);
  if (!isMatch) {
    console.log("Passwords are not matching!");
    return res.status(401).json({
      statusCode: 401,
      status: 401,
      message: "Incorrect password",
    });
  }
  const tokenPayload = jwt.sign(
    { user: user._id, email: user.email },
    process.env.Secret_key,
    {
      expiresIn: parseInt(process.env.JWT_EXPIRATION_TIME),
    }
  );

  res.status(200).json({
    statusCode: 200,
    status: success,
    message: "User Logged In Successfully",
    payload: {
      token: {
        accessToken: token,
        expiresIn: parseInt(process.env.JWT_EXPIRATION_TIME),
      },
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    },
  });
});
