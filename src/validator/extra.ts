import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);
export const resendSchema=z.object({
    to:z.string().email(),
    subject:z.string().min(5),
    html:z.string()
})

export const resendResponseSchema=z.object({
    from:z.string().email(),
    to:z.string().email(),
    subject:z.string().min(5),
    html:z.string()
})