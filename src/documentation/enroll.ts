import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { enrollGetQuery, msgSchema, selectSchemaEnroll } from "../validator/enroll";
import { courseGetQuery } from "../validator/course";
import { userGetQuery } from "../validator/user";

export const enrollDocumentation: RouteConfig[] = [
    {
      method: "delete",
      path: "/enroll/",
      tags: ["Enrollment"],
      summary: "delete with enroll id and user uuid",
      request: {
        query: courseGetQuery,
      },
      responses: {
        200: {
          description: "",
          content: {
            "application/json": {
              schema: selectSchemaEnroll.openapi("Enrollment"),
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
      path: "/enroll/",
      tags: ["Enrollment"],
      summary: "Get single enroll with enroll id",
      request: {
        query: enrollGetQuery,
      },
      responses: {
        200: {
          description: "",
          content: {
            "application/json": {
              schema: selectSchemaEnroll.openapi("Enrollment"),
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
      path: "/enroll/allenroll/",
      tags: ["Enrollment"],
      summary: "Get all enrolled information",
      responses: {
        200: {
          description: "",
          content: {
            "application/json": {
              schema: selectSchemaEnroll.array().openapi("Enrollment"),
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
      path: "/enroll/user/",
      tags: ["Enrollment"],
      summary: "Get all the enrolled course of a user",
      request: {
        query: userGetQuery,
      },
      responses: {
        200: {
          description: "",
          content: {
            "application/json": {
              schema: selectSchemaEnroll.array().openapi("Enrollment"),
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