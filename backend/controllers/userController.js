import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, resp) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return resp
        .status(400)
        .json({ message: "All fileds are required", success: false });
    }
    const user = await User.findOne({ email });
    if (user) {
      return resp.status(400).json({
        message: "User already exist with these email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePhoto = `https://avatar.iran.liara.run/public/boy`;
    await User.create({
      fullname,
      email,
      password: hashedPassword,
      profilePhoto,
    });

    return resp
      .status(200)
      .json({ message: "Account is created succesfully", success: true });
  } catch (err) {
    return resp.status(500).json({ message: err, success: false });
  }
};

export const login = async (req, resp) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return resp
        .status(400)
        .json({ message: "All fileds are required", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return resp
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return resp
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return resp
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `${user.fullname} logged in successfully`,
        user,
        success: true,
      });
  } catch (err) {
    return resp.status(500).json({ message: err, success: false });
  }
};

export const logout = async (req, resp) => {
  try {
    return resp
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "logged out successfully" });
  } catch (err) {
    console.log(err);
  }
};
