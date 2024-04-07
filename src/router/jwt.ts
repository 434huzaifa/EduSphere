import { Router } from "express";
import { JWTinitiator, JWTlogout, JWTtester } from "../handler/jwt";
import { JWTmiddlware } from "../util/middleware";

const router = Router();
router.post("/jwt/",JWTinitiator)
router.get("/jwttest/",JWTtester)
router.get("/jwtout/",JWTmiddlware,JWTlogout)

export default router