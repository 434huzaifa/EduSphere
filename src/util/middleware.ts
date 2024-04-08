import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ZodErrorHandelr } from "../util";
type user = {
  email: string;
  name: string;
  role: string;
  id: string;
};
export async function JWTmiddlware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies;
    if (!token["jwt"]) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    if (!process.env.TOKEN) {
      console.log("JWT MISSING");
      throw new Error("JWT TOKEN NOT FOUND");
    }
    const decode = jwt.verify(token["jwt"], String(process.env.TOKEN)) as user;
    console.log("~ decode", decode);
    req.cookies = decode;
    next();
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}


