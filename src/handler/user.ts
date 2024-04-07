import { Request, Response } from "express-serve-static-core";
import { user } from "../db/schema";
import { db } from "../db";
import { ZodErrorHandelr } from "../util";
import { z } from "zod";
import { eq } from "drizzle-orm";
import {
  insertSchemaUser,
  updateUserSchema,
  userGetQuery,
} from "../validator/user";

export async function updateUser(
  req: Request<
    {},
    z.infer<typeof updateUserSchema>,
    {},
    z.infer<typeof userGetQuery>
  >,
  res: Response
) {
  try {
    userGetQuery.parse(req.query);
    updateUserSchema.parse(req.body);
    let result = [];
    try {
      result = await db
        .update(user)
        .set(req.body)
        .where(eq(user.id, req.query.user))
        .returning();
    } catch (error) {
      result = await db
        .update(user)
        .set(req.body)
        .where(eq(user.email, req.query.user))
        .returning();
    }
    if (result.length != 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}

export async function deleteUser(
  req: Request<{}, {}, {}, z.infer<typeof userGetQuery>>,
  res: Response
) {
  try {
    userGetQuery.parse(req.query);
    let result = [];
    try {
      result = await db
        .delete(user)
        .where(eq(user.id, req.query.user))
        .returning();
    } catch (error) {
      result = await db
        .delete(user)
        .where(eq(user.email, req.query.user))
        .returning();
    }
    if (result.length != 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}

export async function getAllUser(req: Request, res: Response) {
  try {
    const result = await db.query.user.findMany();
    res.status(200).send(result);
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}

export async function getUser(
  req: Request<{}, {}, {}, z.infer<typeof userGetQuery>>,
  res: Response
) {
  try {
    userGetQuery.parse(req.query);
    let result;
    try {
      result = await db.query.user.findFirst({
        where: eq(user.id, req.query.user),
      });
    } catch (error) {
      result = await db.query.user.findFirst({
        where: eq(user.email, req.query.user),
      });
    }
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}

export async function insertUser(
  req: Request<{}, {}, z.infer<typeof insertSchemaUser>>,
  res: Response
) {
  try {
    insertSchemaUser.parse(req.body);
    const result = (await db.insert(user).values(req.body).returning()).pop();
    res.status(201).send(result);
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}

