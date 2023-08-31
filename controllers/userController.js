import { User } from "../models/Usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { saltRounds } from "../config/config.js";

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(402).json({ message: "User already exist" });
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
  } catch (error) {
    res.status(200).json({
      statusCode: "400",
      status: fail,
      message: "User Not Created",
      payload: { error },
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await User.findOne({ email });
    if (!checkEmail) {
      return res.status(402).json({ message: "User Not Found" });
    }

    const passwordMatch = await bcrypt.compare(user.password, password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "You entered wrong password" });
    }
    const token = await jwt.sign({ user: user._id }, SecretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({
      statusCode: 200,
      status: success,
      message: "User Logged In Successfully",
      payload: { token },
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      status: fail,
      message: "User Not Logged In",
      payload: { error },
    });
  }
};
