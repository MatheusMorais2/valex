import { Router } from "express";
import { cardCreationSchemaValidation } from "../middlewares/cardCreationSchemaValidation.js";
import {
  activateCard,
  blockCard,
  createCard,
  getExtract,
  unblockCard,
} from "../controllers/cardController.js";
import { cardActivationSchemaValidation } from "../middlewares/cardActivationSchemaValidation.js";
import { schemaValidationMiddleware } from "../middlewares/schemaValidationMiddleware.js";
import cardBlockingSchema from "../schemas/cardBlockingSchema.js";

const cardRouter = Router();

cardRouter.post("/card", cardCreationSchemaValidation, createCard);
cardRouter.post("/card/activate", cardActivationSchemaValidation, activateCard);
cardRouter.get("/card/extract/:id", getExtract);
cardRouter.post(
  "/card/block/:id",
  schemaValidationMiddleware(cardBlockingSchema),
  blockCard
);
cardRouter.post(
  "/card/unblock/:id",
  schemaValidationMiddleware(cardBlockingSchema),
  unblockCard
);

export default cardRouter;
