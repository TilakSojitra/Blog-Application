import express from "express";
import { isUserExist, loginUser, signupUser, isEmailExist, getLoggedinUser } from "../controllers/user-controller.js";
import { uploadImage,getImage } from "../controllers/image-controller.js";
import { createPost, getAllPost, getPost,updatePost,deletePost } from "../controllers/post-controller.js";
import { addComment, getCommentsByPostId,deleteComment } from "../controllers/comment-controller.js";
import { authenticateToken } from "../controllers/jwt-controller.js";
import upload from "../utils/upload.js";
import { sendVerificationMail, verifyEmail } from "../controllers/email-controller.js";

const router = express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser);
router.get('/checkuser/:username',isUserExist);
router.get('/checkemail/:email',isEmailExist);
router.post('/send-email', sendVerificationMail);
router.post('/verify-email', verifyEmail);

router.get('/user', authenticateToken, getLoggedinUser);
router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:filename',getImage);
router.post('/create',authenticateToken, createPost);
router.get('/posts',authenticateToken, getAllPost);
router.get('/post/:id',authenticateToken, getPost);

router.put('/update/:id',authenticateToken, updatePost);
router.delete('/delete/:id',authenticateToken, deletePost);

router.post('/comment/add',authenticateToken,addComment);
router.get('/comment/get/:id',authenticateToken, getCommentsByPostId);
router.delete('/comment/delete/:id',authenticateToken,deleteComment);

export default router;


