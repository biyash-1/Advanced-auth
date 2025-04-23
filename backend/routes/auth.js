import express from "express"
const router = express.Router();


import { signupController,loginController, verifyEmail,forgetPassword } from "../controller/authController.js";
router.post('/signup',signupController)
router.post('/login',loginController)
router.post('/verify_email',verifyEmail)
router.post('/forgot_password',forgetPassword)


export default router;