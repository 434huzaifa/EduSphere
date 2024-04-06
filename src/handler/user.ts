import { Request, Response } from "express-serve-static-core";
import { user } from "../db/schema";
import { db } from "../db";

export function getUser(req:Request,res:Response) {
    res.send({})
}

export async function insertUser(req:Request,res:Response) {
    db.insert(user).values([
        {
            email:"saadhuzaifa2497@gmail.com",
            name:"Md.Huzaifa",
            password:"123456",
        }
    ])
}