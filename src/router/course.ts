import { Router } from "express";
import {
  deleteCourse,
  getAllCourse,
  getAllCourseofUser,
  getCourse,
  insertCourse,
  updateCourse,
} from "../handler/course";

const router = Router();
router.post("/", insertCourse);
router.get("/", getCourse);
router.get("/allcourse/", getAllCourse);
router.delete("/", deleteCourse);
router.patch("/", updateCourse);
router.get("/created/", getAllCourseofUser);
export default router;
