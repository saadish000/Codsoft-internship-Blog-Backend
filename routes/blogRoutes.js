//import blogController
//import blog model
import express from "express";
const router = express.Router();

router.route("/create").post();
router.route("/").get();
router.route("/:id").get();
router.route("/:id").delete();
router.route("/:id").put();

export default router;
