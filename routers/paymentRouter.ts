import { Router } from "express";
import { createPayment } from "../controllers/paymentController.js";
import { schemaValidationMiddleware } from "../middlewares/schemaValidationMiddleware.js";
import paymentSchema from "../schemas/paymentSchema.js";

const paymentRouter = Router();

paymentRouter.post(
  "/payment/:id",
  schemaValidationMiddleware(paymentSchema),
  createPayment
);

export default paymentRouter;
