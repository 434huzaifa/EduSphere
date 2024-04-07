import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { course, enrollments, user } from "../db/schema";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { db } from "../db";
import { eq } from "drizzle-orm";
extendZodWithOpenApi(z);
export const insertSchemaEnroll = createInsertSchema(enrollments, {
  course_id: z
    .string()
    .refine((val) => !isNaN(parseInt(val)), {
      message: "Course id is not number",
    })
    .refine(
      async (val) => {
        try {
          const result = await db.query.course.findFirst({
            where: eq(course.id, parseInt(val)),
          });
          return !!result;
        } catch (error) {
          return false;
        }
      },
      { message: "Invalid Course id." }
    ).transform(val=>parseInt(val)),
  user_id: z
    .string()
    .uuid()
    .refine(
      async (val) => {
        try {
          const t_user = await db.query.user.findFirst({
            where: eq(user.id, val),
          });
          return !!t_user;
        } catch (error) {
          return false;
        }
      },
      { message: "Created By is not a valid user" }
    ),
    enrollment_date:z.date().optional()
}).omit({
  id: true,
  createdAt: true,
});

export const updateEnrollSchema = createInsertSchema(enrollments, {
  course_id: z
    .number()
    .optional()
    .refine(
      async (val) => {
        try {
          const result = await db.query.course.findFirst({
            where: eq(course.id, val || 0),
          });
          return !!result;
        } catch (error) {
          return false;
        }
      },
      { message: "Invalid Course id." }
    ),
}).omit({
  id: true,
  createdAt: true,
});

export const selectSchemaEnroll = createSelectSchema(enrollments);
export const msgSchema = z.object({
  msg: z.string(),
});

export const enrollGetQuery=z.object({
  id: z.string().refine(val=>!isNaN(parseInt(val)),{message:"Id is not a number"}),
})