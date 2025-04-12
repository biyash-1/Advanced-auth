import express from "express"
const router = express.Router();

import { signupController,loginController,logoutContoller } from "../controller/authController.js";
router.post('/signup',signupController)
router.post('/login',loginController)
router.post('/logout',logoutContoller)

export default router