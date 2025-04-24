import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";
import bcryptjs from "bcryptjs";
import {sendVerificationEmail,sendwelcomeEmail,sendPasswordResetEmail} from "../mailtrap/Emails.js"
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const setCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "8d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
const clearCookie = (res) => {
  
  res.clearCookie("token", { 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    sameSite: "strict" 
  });
};

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

    // Generate a 6-digit verification token as a string
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      email,
      password: hashPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, 
    });

    await user.save();

 
    setCookie(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);

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

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {

    const verificationCode = String(code);
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired verification code" });
    }

   
    user.isverified = true;  
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendwelcomeEmail(user.email, user.name);

    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Error in verifyEmail", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error verifying email" });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    console.log("isPasswordValid?", isPasswordValid);

    
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

  
    setCookie(res, user._id);
    user.lastlogin = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    console.error("Error in loginController:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

export const logout = async(req,res) =>{
  clearCookie();
  res.status(200).json({sucess: "true", message:"logout sucesfull"})
}


export const  forgetPassword = async(req, res) =>{
  const {email} = req.body;

       try{
        const user = await User.findOne({email});

        if(!user){
          return res.status(400).json({sucess:false,message:"user not found"})
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenEXpiresAt = Date.now() +1*60*60&1000;
        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenEXpiresAt

        // send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        res.status(200).json({sucess:true, message: "password reset link sent to your email"}

        )

       }

       catch(err) {
        console.log("error in forgetpassword", err);
        res.status(400).json({sucess:false, message:err.message});

       }
}

