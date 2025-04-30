import express from "express"
const router = express.Router();
import {verifyToken} from "../middleware/verifyToken.js"


import { signupController,loginController, verifyEmail,forgetPassword ,resetPassword, checkAuth, logout} from "../controller/authController.js";
router.post('/signup',signupController)
router.post('/login',loginController)
router.post('/verify_email',verifyEmail)
router.post('/forgot_password',forgetPassword)
router.get('/checkAuth',verifyToken,checkAuth)
router.post('/reset_password/:token',resetPassword)
router.post('/logout',logout)


export default router;