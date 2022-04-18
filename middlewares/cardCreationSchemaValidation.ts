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
    return res.status(422).send(validation.error.details);
  }

  next();
}
