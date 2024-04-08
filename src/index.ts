import express from "express";
import userRouter from "./router/user";
import logger from "morgan";
import dayjs from "dayjs";
import swaggerUi, { SwaggerUiOptions } from "swagger-ui-express";
import { generator } from "./documentation";
import courseRouter from "./router/course";
import enrollRouter from "./router/enroll";
import jwtRouter from "./router/jwt";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(
  logger(function (tokens, req, res) {
    return [
      dayjs().format("MMM DD hh:mm:ss A"),
      tokens.url(req, res),
      tokens.method(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
    ].join(" - ");
  })
);
app.use(cookieParser());
app.use(cors());
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/enroll", enrollRouter);
app.use("/", jwtRouter);
const options: SwaggerUiOptions = {
  customSiteTitle: "EduSphere",
  customfavIcon: "/favicon.png",
};
app.get("/",(req,res)=>{
  res.send("I AM RUNNING")
})
app.use("/docs", swaggerUi.serve, swaggerUi.setup(generator, options));

app.listen(port, () => {
  console.log(`I AM RUNNING ON http://localhost:${port}`);
});
export default app;
