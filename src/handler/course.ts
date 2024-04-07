import { Request, Response } from "express-serve-static-core";
import { db } from "../db";
import { ZodErrorHandelr } from "../util";
import {
  courseGetQuery,
  insertSchemaCourse,
  updateCourseSchema,
} from "../validator/course";
import { course, enrollments, user } from "../db/schema";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { userGetQuery } from "../validator/user";

export async function insertCourse(
  req: Request<{}, {}, z.infer<typeof insertSchemaCourse>>,
  res: Response
) {
  try {
    await insertSchemaCourse.parseAsync(req.body);
    const result = (await db.insert(course).values(req.body).returning()).pop();
    res.status(201).send(result);
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}

export async function getCourse(
  req: Request<{}, {}, {}, z.infer<typeof courseGetQuery>>,
  res: Response
) {
  try {
    courseGetQuery.parse(req.query);
    let result;
    result = await db.query.course.findFirst({
      with: {
        createdBy: { columns: { email: true, name: true } },
      },
      where: and(
        eq(course.createdBy, req.query.user),
        eq(course.id, parseInt(req.query.id))
      ),
    });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ msg: "Course not found" });
    }
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}

export async function getAllCourse(req: Request, res: Response) {
  try {
    const result = await db.query.course.findMany({
      with: {
        createdBy: {
          columns: { name: true, email: true },
        },
      },
    });
    res.status(200).send(result);
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}

export async function deleteCourse(
  req: Request<{}, {}, {}, z.infer<typeof courseGetQuery>>,
  res: Response
) {
  try {
    courseGetQuery.parse(req.query);
    let result = [];
    result = await db
      .delete(course)
      .where(
        and(
          eq(course.createdBy, req.query.user),
          eq(course.id, parseInt(req.query.id))
        )
      )
      .returning();
    if (result.length != 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}

export async function updateCourse(
  req: Request<
    {},
    z.infer<typeof updateCourseSchema>,
    {},
    z.infer<typeof courseGetQuery>
  >,
  res: Response
) {
  try {
    courseGetQuery.parse(req.query);
    updateCourseSchema.parse(req.body);
    let result = [];
    result = await db
      .update(course)
      .set(req.body)
      .where(
        and(
          eq(course.createdBy, req.query.user),
          eq(course.id, parseInt(req.query.id))
        )
      )
      .returning();

    if (result.length != 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}

export async function getAllCourseofUser(
  req: Request<{}, {}, {}, z.infer<typeof userGetQuery>>,
  res: Response
) {
  try {
    userGetQuery.parse(req.query);
    let result = [];
    try {
      result = await db.query.course.findMany({
        where: eq(course.createdBy, req.query.user),
      });
      res.status(200).send(result);
    } catch (error) {
      const t_user = await db.query.user.findFirst({
        where: eq(user.email, req.query.user),
      });
      if (t_user) {
        result = await db.query.course.findMany({
          where: eq(course.createdBy, t_user.id),
        });
        res.status(200).send(result);
      } else {
        res.status(404).send({ msg: "User not found" });
      }
    }
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}

