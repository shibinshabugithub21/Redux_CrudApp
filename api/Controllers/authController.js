import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// signup
export const signup = async (req, res, next) => {
  console.log("Request Body:", req.body);
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User Created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

// signin
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(401, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 36000000);
    res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// google auth

export const googleSignIn = async (req, res, next) => {
    try {
      const { name, email, photo } = req.body;
  
      // Check if user already exists
      let user = await User.findOne({ email });
  
      if (user) {
        // User exists, generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: hashPassword, ...rest } = user._doc;
        const expiryDate = new Date(Date.now() + 36000000);
  
        // Send token in cookie
        res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
      } else {
        // User does not exist, create a new user
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
  
        const newUser = new User({
          username: name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
          email,
          password: hashPassword,
          profilePicture: photo,
        });
  
        // Save new user to database
        await newUser.save();
  
        // Generate JWT token for new user
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: hashPassword2, ...rest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 36000000);
  
        // Send token in cookie
        res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
      }
    } catch (error) {
      next(error);
    }
  };


 // Signout
export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json({ message: 'SignOut success' });
};

  
