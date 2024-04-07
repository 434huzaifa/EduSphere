import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {  enrollments} from "../db/schema";
import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);
export const insertSchemaEnroll = createInsertSchema(enrollments).omit({
  id: true,
  createdAt: true,
});
export const selectSchemaEnroll = createSelectSchema(enrollments);
export const msgSchema = z.object({
  msg: z.string(),
});
