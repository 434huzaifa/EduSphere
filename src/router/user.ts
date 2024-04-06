import { Router } from "express";
import { getUser } from "../handler/user";
const router = Router();
router.get("/",getUser);
export default router;