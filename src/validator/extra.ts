import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { error } from "console";
extendZodWithOpenApi(z);
export const resendSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(5),
  html: z.string(),
});

export const resendResponseSchema = z.object({
  msg: z.string(),
  result: z.object({
    data:z.object({
        id:z.string().uuid()
    }),
    error:z.null()
  }),
});
