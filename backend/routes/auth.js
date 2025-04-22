import express from "express"
const router = express.Router();

import { signupController,loginController, verifyEmail } from "../controller/authController.js";
router.post('/signup',signupController)
router.post('/login',loginController)
router.post('/verify_email',verifyEmail)


export default router