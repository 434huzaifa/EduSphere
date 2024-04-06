import express from "express"
import userRouter from "./router/user"
const app = express();
const port =process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user",userRouter)

app.listen(port,()=>{
    console.log(`I AM RUNNING ON ${port}`);
})