import express from "express";
import {
  login,
  signup,
  logout,
  getAllUsers,
  getUser,
} from "../controllers/authController.js";

const router = express.Router();

// get all the users
router.get("/", getAllUsers);

// get a user
router.get("/:id", getUser);

// signup
router.post("/signup", signup);

// login
router.post("/login", login);

// logout
router.post("/logout", logout);

export default router;
