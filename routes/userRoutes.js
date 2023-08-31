import express from "express";
const router = express.Router();
import { loginUser, registerUser } from "../controllers/userController.js";
import { tokenAuthentication } from "../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/login", tokenAuthentication, loginUser);

export default router;
