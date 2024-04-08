import { Router } from "express";
import { sendEmail } from "../handler/extra";

const router=Router()

router.post('/sendmail/',sendEmail)

export default router;