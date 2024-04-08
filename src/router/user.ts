import { Router } from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  insertUser,
  updateUser,
} from "../handler/user";

const router = Router();
router.get("/", getUser);
router.post("/", insertUser);
router.get("/alluser/", getAllUser);
router.delete("/", deleteUser);
router.patch("/", updateUser);

export default router;
