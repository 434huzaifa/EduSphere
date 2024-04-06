import { Response } from "express-serve-static-core";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";


export function ZodErrorHandelr(res: Response, error:any) {
  console.log("~ error", error)
  if (error instanceof ZodError) {
    const formattedError = fromZodError(error);
    res.status(400).send({ msg: formattedError.message });
  } else {
    res.status(500).send({ msg: "An unexpected error occurred" });
  }
  return
}
