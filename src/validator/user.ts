import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "../db/schema";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
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
    role:z.enum(['user','admin']).optional(),
    password:z.string().min(6).max(6).optional(),
    image:z.string().url().optional()
  }).omit({
    id: true,
    createdAt: true,
    email:true
  });
  export const selectSchemaUser = createSelectSchema(user);

  export const userGetQuery=z.object({
    user:z.string().uuid({message:"Invalid UUID or EMAIL"}).or(z.string().email({message:"Invalid UUID or EMAIL"}))
  })
  