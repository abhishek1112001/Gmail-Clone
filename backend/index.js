//const express = require('express') // node style
import express from "express"; // react style
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoutes.js";
import emailRoute from "./routes/emailRoutes.js";

dotenv.config({});
connectDB();
const app = express();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: `http://localhost:5173`,
  credentials: true,
};

app.use(cors(corsOptions));

//Routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/email", emailRoute);

const PORT = 8080;

app.listen(PORT, () => {
  console.log("Server is running on 8080");
});
