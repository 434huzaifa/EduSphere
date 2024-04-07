import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { msgSchema } from "../validator/enroll";
import { emailSchema } from "../validator/jwt";

export const jwtDocumentation: RouteConfig[] = [
    {
        method: "post",
        tags: ["JWT"],
        path: "/jwt/",
        summary: "Create JWT",
        request: {
          body: {
            content: {
              "application/json": {
                schema: emailSchema,
              },
            },
          },
        },
        responses: {
          200: {
            description: "",
            content: {
              "application/json": {
                schema: msgSchema.openapi("JWT Success"),
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
      },
      {
        method: "get",
        tags: ["JWT"],
        path: "/jwttest/",
        summary: "Test you jwt with this",
        responses: {
          200: {
            description: "",
            content: {
              "application/json": {
                schema: msgSchema.openapi("JWT Success"),
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
      },
      {
        method: "get",
        tags: ["JWT"],
        path: "/jwtout/",
        summary: "Logout JWT",
        responses: {
          200: {
            description: "",
            content: {
              "application/json": {
                schema: msgSchema.openapi("JWT Success"),
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
      },

  ];