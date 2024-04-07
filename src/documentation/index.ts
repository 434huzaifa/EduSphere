import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";

import { postRequestDoc } from "./helpter";
import { userDocument } from "./user";
import { insertSchemaUser, selectSchemaUser } from "../validator/user";
import { insertSchemaCourse, selectSchemaCourse } from "../validator/course";
import { insertSchemaEnroll, selectSchemaEnroll } from "../validator/enroll";
import { courseDocument } from "./course";
import { enrollDocumentation } from "./enroll";
import { jwtDocumentation } from "./jwt";
import { OpenAPIObjectConfig } from "@asteasolutions/zod-to-openapi/dist/v3.0/openapi-generator";
export const registry = new OpenAPIRegistry();
userDocument.map((x) => {
  registry.registerPath(x);
});
courseDocument.map((x) => {
  registry.registerPath(x);
});
enrollDocumentation.map((x) => {
  registry.registerPath(x);
});
jwtDocumentation.map((x) => {
  registry.registerPath(x);
});
postRequestDoc(
  selectSchemaUser,
  insertSchemaUser,
  "/user/",
  "Create a new User",
  "User"
);

postRequestDoc(
  selectSchemaCourse,
  insertSchemaCourse,
  "/course/",
  "Create a new Course",
  "Course"
);
postRequestDoc(
  selectSchemaEnroll,
  insertSchemaEnroll,
  "/enroll/",
  "Create a new Enrollment",
  "Enrollment"
);

const config: OpenAPIObjectConfig = {
  openapi: "3.0.0",
  info: {
    title: "EduSphere",
    version: "1.0.0",
    description: "A simple API EduSphere.",
  },
  tags: [
    {
      name: "JWT",
      description:
        `This Section created for JWT testing. Make sure you enable third party cookies.[HOW TO ENABLE THIRD-PARTY COOKIES ON MY BROWSER?](https://cleeng.zendesk.com/hc/en-us/articles/360009526800-How-to-enable-third-party-cookies-on-my-browser)
        
        `,
    },
  ],
};
export const generator = new OpenApiGeneratorV3(
  registry.definitions
).generateDocument(config);
