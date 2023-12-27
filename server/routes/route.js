import express from "express";
import { loginUser, signupUser } from "../controllers/user-controller.js";
import { uploadImage,getImage } from "../controllers/image-controller.js";
import { createPost, getAllPost, getPost } from "../controllers/post-controller.js";
import { authenticateToken } from "../controllers/jwt-controller.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser);

router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:filename',getImage);
router.post('/create',authenticateToken, createPost);
router.get('/posts',authenticateToken, getAllPost);
router.get('/post/:id',authenticateToken, getPost);

export default router;


