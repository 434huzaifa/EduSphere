import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import {
  courseGetQuery,
  selectSchemaCourse,
  updateCourseSchema,
} from "../validator/course";
import { msgSchema } from "../validator/enroll";
import { userGetQuery } from "../validator/user";
export const courseDocument: RouteConfig[] = [
  {
    method: "patch",
    path: "/course/",
    tags: ["Course"],
    summary: "Update course with course id and user uuid",
    request: {
      query: courseGetQuery,
      body: {
        content: {
          "application/json": {
            schema: updateCourseSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "",
        content: {
          "application/json": {
            schema: selectSchemaCourse.array().openapi("Course"),
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
    method: "delete",
    path: "/course/",
    tags: ["Course"],
    summary: "delete with course id and user uuid",
    request: {
      query: courseGetQuery,
    },
    responses: {
      200: {
        description: "",
        content: {
          "application/json": {
            schema: selectSchemaCourse.openapi("Course"),
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
    path: "/course/",
    tags: ["Course"],
    summary: "Get single course course id and user uuid",
    request: {
      query: courseGetQuery,
    },
    responses: {
      200: {
        description: "",
        content: {
          "application/json": {
            schema: selectSchemaCourse.openapi("Course"),
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
    path: "/course/allcourse/",
    tags: ["Course"],
    summary: "Get all course",

    responses: {
      200: {
        description: "",
        content: {
          "application/json": {
            schema: selectSchemaCourse.array().openapi("Course"),
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
    path: "/course/created/",
    tags: ["Course"],
    summary: "Get all the course of user created",
    request: {
      query: userGetQuery,
    },
    responses: {
      200: {
        description: "",
        content: {
          "application/json": {
            schema: selectSchemaCourse.array().openapi("Course"),
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
    path: "/course/enroll/",
    tags: ["Course"],
    summary: "Get all the course of user enroll",
    request: {
      query: userGetQuery,
    },
    responses: {
      200: {
        description: "",
        content: {
          "application/json": {
            schema: selectSchemaCourse.array().openapi("Course"),
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
