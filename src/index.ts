import express from "express"
import userRouter from "./router/user"
import logger from "morgan"
import dayjs from "dayjs";
import swaggerUi from "swagger-ui-express"
import { generator } from "./documentation";

const app = express();
const port =process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger(function (tokens,req,res) {
    return [
        dayjs().format("MMM DD hh:mm:ss A"),
        tokens.url(req, res),
        tokens.method(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
    ].join(" - ")
}));
app.use("/user",userRouter)
app.use("/",swaggerUi.serve,swaggerUi.setup(generator))

app.listen(port,()=>{
    console.log(`I AM RUNNING ON http://localhost:${port}`);
})