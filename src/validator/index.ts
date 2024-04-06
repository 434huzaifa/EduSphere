import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { course, enrollments, user } from "../db/schema";
import { z } from "zod";
import {
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);
export const insertSchemaUser = createInsertSchema(user, {
  email: z.string().email(),
  image:z.string().url().optional(),
}).omit({
  id: true,
  createdAt: true,
});

export const updateUserSchema = createInsertSchema(user, {
  name:z.string().min(6).optional(),
  role:z.string().optional().refine(val=>{
    return val && ['user','admin'].includes(val)
  }),
  password:z.string().min(6).max(6).optional(),
  image:z.string().url().optional()
}).omit({
  id: true,
  createdAt: true,
  email:true
});


export const insertSchemaCourse = createInsertSchema(course).omit({
  id: true,
  createdAt: true,
});

export const insertSchemaEnroll = createInsertSchema(enrollments).omit({
  id: true,
  createdAt: true,
});
export const selectSchemaUser = createSelectSchema(user);
export const selectSchemaCourse = createSelectSchema(course);
export const selectSchemaEnroll = createSelectSchema(enrollments);

export const msgSchema = z.object({
  msg: z.string(),
});

export const userGetQuery=z.object({
  user:z.string().uuid({message:"Invalid UUID or EMAIL"}).or(z.string().email({message:"Invalid UUID or EMAIL"}))
})


