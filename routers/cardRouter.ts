import { Router } from "express";
import { cardCreationSchemaValidation } from "../middlewares/cardCreationSchemaValidation.js";
import { createCard } from "../controllers/cardController.js";

const cardRouter = Router();

cardRouter.post("/card", cardCreationSchemaValidation, createCard);

export default cardRouter;
