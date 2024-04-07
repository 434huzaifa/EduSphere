import { Request, Response } from "express-serve-static-core";
import { ZodErrorHandelr } from "../util";
import { z } from "zod";
import { emailSchema } from "../validator/jwt";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { user } from "../db/schema";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export async function JWTinitiator(
  req: Request<{}, {}, z.infer<typeof emailSchema>>,
  res: Response
) {
  try {
    
    const result = await db.query.user.findFirst({
      columns: { createdAt: false, password: false, image: false },
      where: eq(user.email, req.body.email),
    });
    if (!process.env.TOKEN) {
      console.log("JWT MISSING");
      throw new Error("JWT TOKEN NOT FOUND");
    }
    if (result) {
      const token = jwt.sign(result, String(process.env.TOKEN), {
        expiresIn: "1h",
      });
      res
        .cookie("jwt", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send({ msg: "JWT successfully added" });
    } else {
      res.status(404).send({ msg: "User not found." });
    }
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}

export async function JWTtester(req: Request, res: Response) {
  res.status(200).send({msg:"You have JWT"})
}

export async function JWTlogout(req: Request, res: Response) {
  console.log('req.cookies',req.cookies);
  res
    .clearCookie("jwt", {
      maxAge: 0,
      sameSite: "none",
      secure: true,
      httpOnly: true,
    })
    .send({ msg: "Successfully logout. And JWT clear" });
}
