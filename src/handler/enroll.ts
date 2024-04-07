import { Request, Response } from "express-serve-static-core";
import { db } from "../db";
import { ZodErrorHandelr } from "../util";
import { z } from "zod";
import { enrollGetQuery, insertSchemaEnroll } from "../validator/enroll";
import {  enrollments } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { courseGetQuery } from "../validator/course";
import { userGetQuery } from "../validator/user";

export async function insertEnroll(
  req: Request<{}, {}, z.infer<typeof insertSchemaEnroll>>,
  res: Response
) {
  try {
    await insertSchemaEnroll.parseAsync(req.body);

    const result = (
      await db.insert(enrollments).values(req.body).returning()
    ).pop();
    res.status(201).send(result);
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}

export async function getEnroll(
  req: Request<{}, {}, {}, z.infer<typeof enrollGetQuery>>,
  res: Response
) {
  try {
    enrollGetQuery.parse(req.query);
    let result;
    result = await db.query.enrollments.findFirst({
      where: eq(enrollments.id, parseInt(req.query.id)),
      with: {
        user: {
          columns: { id: true, name: true },
        },
        course: {
          columns: { id: true, title: true },
        },
      },
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

export async function deleteEnroll(
  req: Request<{}, {}, {}, z.infer<typeof courseGetQuery>>,
  res: Response
) {
  try {
    courseGetQuery.parse(req.query);
    let result = [];
    result = await db
      .delete(enrollments)
      .where(
        and(
          eq(enrollments.user_id, req.query.user),
          eq(enrollments.id, parseInt(req.query.id))
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

export async function getAllEnroll(req: Request, res: Response) {
  try {
    const result = await db.query.enrollments.findMany({
      with: {
        user: {
          columns: { id: true, name: true },
        },
        course: {
          columns: { id: true, title: true },
        },
      },
    });
    res.status(200).send(result);
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}

export async function getAllEnrollCourse(
  req: Request<{}, {}, {}, z.infer<typeof userGetQuery>>,
  res: Response
) {
  try {
    userGetQuery.parse(req.query);
    const result=await db.query.enrollments.findMany({
        where:(eq(enrollments.user_id,req.query.user)),
        with:{
            course:{
                columns:{createdAt:false,createdBy:false}
            }
        },
        columns:{course_id:true}
    })
    return res.status(200).send(result)
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}
