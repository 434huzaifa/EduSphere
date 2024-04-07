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
export const registry = new OpenAPIRegistry();
userDocument.map(x=>{
    registry.registerPath(x)
})
courseDocument.map(x=>{
  registry.registerPath(x)
})

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

const config = {
  openapi: "3.0.0",
  info: {
    title: "EduSphere",
    version: "1.0.0",
    description: "A simple API EduSphere.",
  },
};
export const generator = new OpenApiGeneratorV3(
  registry.definitions
).generateDocument(config);
