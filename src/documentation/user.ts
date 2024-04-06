import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import {
  msgSchema,
  selectSchemaUser,
  updateUserSchema,
  userGetQuery,
} from "../validator";

export const userDocument:RouteConfig[] = [
  {
    method: "patch",
    path: "/user/",
    tags: ["User"],
    summary: "Update user with email or id",
    request: {
      query:userGetQuery,
      body: {
        content: {
          "application/json": {
            schema: updateUserSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "",
        content: {
          "application/json": {
            schema: selectSchemaUser.openapi("User"),
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
    path: "/user/",
    tags: ["User"],
    summary: "delete user with email or id",
    request: {
      query: userGetQuery,
    },
    responses: {
      200: {
        description: "",
        content: {
          "application/json": {
            schema: selectSchemaUser.openapi("User"),
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
    path: "/user/",
    tags: ["User"],
    summary: "Get single user either by email or id",
    request: {
      query: userGetQuery,
    },
    responses: {
      200: {
        description: "",
        content: {
          "application/json": {
            schema: selectSchemaUser.openapi("User"),
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
    path: "/user/alluser/",
    tags: ["User"],
    summary: "Get single user either by email or id",
    responses: {
      200: {
        description: "",
        content: {
          "application/json": {
            schema: selectSchemaUser.array().openapi("User"),
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
