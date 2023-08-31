import {
  createBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
} from "../controllers/blogController.js";
import express from "express";
import { tokenAuthentication } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/create").post(tokenAuthentication, createBlog);
router.route("/").get(tokenAuthentication, getAllBlogs);
router.route("/:id").get(tokenAuthentication, getBlog);
router.route("/:id").delete(tokenAuthentication, deleteBlog);
router.route("/:id").put(tokenAuthentication, updateBlog);

export default router;
