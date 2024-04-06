import { ZodObject } from "zod";
import { msgSchema } from "../validator";
import { registry } from ".";

export function postRequestDoc(
  responseSchema: ZodObject<any>,
  bodySchema: ZodObject<any>,
  path: string,
  summary: string,
  apiName: string
) {
  registry.registerPath({
    method: "post",
    tags: [apiName],
    path: path,
    summary: summary,
    request: {
      body: {
        content: {
          "application/json": {
            schema: bodySchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "",
        content: {
          "application/json": {
            schema: responseSchema.openapi(apiName),
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
  });
}
