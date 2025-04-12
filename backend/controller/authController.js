
import User from "../model/UserModel.js"
import bcryptjs from "bcryptjs"
// controller/authController.js

import {genTokenSetCookie} from "../utils/genTokenSetCookie.js"; // 👈 No braces

export const signupController = async (req, res) => {
   const { email, password, name } = req.body;
   try {
     if (!email || !password || !name) {
       throw new Error("All fields are required");
     }
 
     const userAlreadyExist = await User.findOne({ email });
     if (userAlreadyExist) {
       return res.status(400).json({
         success: false,
         message: "User already exists",
       });
     }
 
     const hashPassword = await bcryptjs.hash(password, 10);
 
     const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
 
     const user = new User({
       email,
       password: hashPassword,
       name,
       verificationToken,
       verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
     });
 
     await user.save();
 
     genTokenSetCookie(res, user._id);
 
     res.status(201).json({
       success: true,
       message: "User created",
       user: {
         ...user._doc,
         password: undefined,
       },
     });
   } catch (err) {
     console.log(err);
     res.status(500).json({ success: false, message: "Server error" });
   }
 };
 
export const loginController = async () =>{

}

export const logoutContoller = async () =>{
    
}

