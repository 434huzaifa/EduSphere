import { Router } from "express";
import { deleteEnroll, getAllEnroll, getAllEnrollCourse, getEnroll, insertEnroll } from "../handler/enroll";

const router=Router()

router.delete("/",deleteEnroll)
router.get("/",getEnroll)
router.post("/",insertEnroll)
router.get("/allenroll/",getAllEnroll)
router.get("/user/",getAllEnrollCourse)

export default router;
