import { Router } from "express";
import { cardCreationSchemaValidation } from "../middlewares/cardCreationSchemaValidation.js";
import {
  activateCard,
  createCard,
  getExtract,
} from "../controllers/cardController.js";
import { cardActivationSchemaValidation } from "../middlewares/cardActivationSchemaValidation.js";

const cardRouter = Router();

cardRouter.post("/card", cardCreationSchemaValidation, createCard);
cardRouter.post("/card/activate", cardActivationSchemaValidation, activateCard);
cardRouter.get("/card/extract/:id", getExtract);

export default cardRouter;
