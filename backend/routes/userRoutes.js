// import express from "express";
// import { login, register } from "../controllers/userController.js"; // for these types of imports we need to mention .js

// const router = express.Router();

// router.route("/register").post(register);
// router.route("/login").post(login);

// export default router;
import express from "express";
import { register, login, logout } from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

export default router;
