import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { msgSchema } from "../validator/enroll";
import { resendResponseSchema, resendSchema } from "../validator/extra";

export const extraDocumentation: RouteConfig[] = [
    {
        method: "post",
        path: "/sendmail/",
        tags: ["Extra"],
        summary: "Send mail to Me. Its free version so only my email is valid (434.darkmaster@gmail.com)",
        request: {
            body: {
                content: {
                  "application/json": {
                    schema: resendSchema,
                  },
                },
              }
        },
        responses: {
          200: {
            description: "",
            content: {
              "application/json": {
                schema: resendResponseSchema.openapi("Resend"),
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: msgSchema.openapi("Error"),
              },
            },
          },
          500: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: msgSchema.openapi("Error"),
              },
            },
          },
        },
      }
]