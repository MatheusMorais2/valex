import { Request, Response, NextFunction } from "express";
import CardCreationSchema from "../schemas/cardCreationSchema.js";

export function cardCreationSchemaValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cardInfo = req.body;
  const validation = CardCreationSchema.validate(cardInfo);

  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}
