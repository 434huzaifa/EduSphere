import { Request, Response } from "express-serve-static-core";
import { Resend } from "resend";
import { ZodErrorHandelr } from "../util";
import { z } from "zod";
import { resendSchema } from "../validator/extra";
export async function sendEmail(
  req: Request<{}, {}, z.infer<typeof resendSchema>>,
  res: Response
) {
  try {
    resendSchema.parse(req.body)
    if (!process.env.RESEND_KEY) {
      throw new Error("Mail API key missing");
    }
    const resend = new Resend(process.env.RESEND_KEY);
    const result= await resend.emails.send({
      from: "Huzaifa <onboarding@resend.dev>",
      to: req.body.to,
      subject: req.body.subject,
      html: req.body.html,
    });
    if (!result.data) {
        res.status(400).send({msg:`${result.error?.message}`})
    }
    res.send(result)
  } catch (error) {
    ZodErrorHandelr(res, error);
  }
}
