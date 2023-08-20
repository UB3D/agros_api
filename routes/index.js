import express from "express";
import {
  Register,
  getUsers,
  Login,
  Edit,
  Remove,
} from "../controllers/Users.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", Register);
router.put("/users", Edit);
router.delete("/users", Remove);
router.post("/login", Login);
// router.delete("/logout", Logout);

export default router;
