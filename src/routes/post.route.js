import express from "express";
import Postcontroller from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", Postcontroller.createPost);
router.put("/:id", Postcontroller.updatePost);
router.delete("/:id", Postcontroller.deletePost);
router.get("/", Postcontroller.getAllPosts);
router.get("/single/post", Postcontroller.getPostbyId);
router.get("/user/:id", Postcontroller.getUserPosts);
router.post("/add/comment", Postcontroller.addCommentIdInCommentArray);

export default router;
