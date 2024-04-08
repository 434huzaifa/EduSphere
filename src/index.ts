import express, { NextFunction, Request, Response } from "express";
import userRouter from "./router/user";
import logger from "morgan";
import dayjs from "dayjs";
import errorHandler, { Errors, Guards } from "errors-express";
import { generator } from "./documentation";
import courseRouter from "./router/course";
import enrollRouter from "./router/enroll";
import jwtRouter from "./router/jwt";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: ["https://edu-sphere-yqk2.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
const ParseJson = (req: Request, res: Response, next: NextFunction) => {
  const errorHandler = (err: Error | null) => {
      if (err instanceof Error) {
          res.status(400).send({msg:err.message})
          return
      }
      next()
  }

  express.json()(req, res, errorHandler)
}



app.use(express.urlencoded({ extended: false }));
app.use(ParseJson);
app.use(express.static("public"));
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

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/enroll", enrollRouter);
app.use("/", jwtRouter);

app.get("/", (req, res) => {
  res.send("I AM RUNNING");
});
app.get("/swagger/", (req, res) => {
  res.send(generator);
});

app.use(
  errorHandler((error, req) => {
    console.log(`[${req.method} ${req.url}] ${error.message}`);
  })
);


app.all("*", Guards.NotFound());
app.listen(port, () => {
  console.log(`I AM RUNNING ON http://localhost:${port}`);
});
export default app;
