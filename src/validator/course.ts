import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { course, user } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";
extendZodWithOpenApi(z);
export const insertSchemaCourse = createInsertSchema(course, {
  createdBy: z
    .string()
    .uuid()
    .refine(async (val) => {
      try {
        const t_user = await db.query.user.findFirst({
          where: eq(user.id, val),
        });
        return !!t_user;
      } catch (error) {
        
        console.error("Error validating createdBy ID:", error);
        return false;
      }
    },{message:"Created By is not a valid user"}),
}).omit({
  id: true,
  createdAt: true,
});

export const updateCourseSchema = createInsertSchema(course, {
  title: z.string().min(6).optional(),
  category: z.string().min(3).optional(),
  level: z.enum(["basic", "intermediate", "expert"]).optional(),
  popularity: z.number().optional(),
}).omit({
  id: true,
  createdAt: true,
  createdBy: true,
});

export const selectSchemaCourse = createSelectSchema(course);
export const courseGetQuery = z.object({
  user: z.string().uuid({ message: "Invalid UUID or EMAIL" }),
  id: z.string().refine(val=>!isNaN(parseInt(val)),{message:"Id is not a number"}),
});
