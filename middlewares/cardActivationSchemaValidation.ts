import { Request, Response, NextFunction } from "express";
import cardActivationSchema from "../schemas/cardActivationSchema.js";

export function cardActivationSchemaValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validation = cardActivationSchema.validate(req.body);
  if (validation.error) return res.sendStatus(422);

  next();
}
