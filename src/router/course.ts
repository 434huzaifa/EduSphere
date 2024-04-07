import e, { Router } from "express";
import {
  deleteCourse,
  getAllCoruseOfUser,
  getAllCourse,
  getAllEnrollCourse,
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
router.patch("/created/", getAllCoruseOfUser);
router.patch("/enroll/", getAllEnrollCourse);
export default router;
