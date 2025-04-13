import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";
import bcryptjs from "bcryptjs";
import {sendVerificationEmail} from "../mailtrap/Emails.js"
import dotenv from "dotenv";
dotenv.config();

const setCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
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
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // token expires after 24 hours
    });

    await user.save();

    // Call the inline cookie function to sign the token and set the cookie
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

export const loginController = async () => {
  // Implement login logic here...
};

