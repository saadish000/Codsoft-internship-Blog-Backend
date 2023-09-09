import express from "express";
const router = express.Router();
import { login, register } from "../controllers/userController.js";
import { tokenAuthentication } from "../middleware/authMiddleware.js";

router.post("/register", register);
router.post("/login", tokenAuthentication, login);

export default router;
