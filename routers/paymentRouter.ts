import { Router } from "express";
import {
  createOnlinePayment,
  createPayment,
} from "../controllers/paymentController.js";
import { schemaValidationMiddleware } from "../middlewares/schemaValidationMiddleware.js";
import paymentSchema from "../schemas/paymentSchema.js";
import onlinePaymentSchema from "../schemas/onlinePaymentSchema.js";

const paymentRouter = Router();

paymentRouter.post(
  "/payment/:id",
  schemaValidationMiddleware(paymentSchema),
  createPayment
);
paymentRouter.post(
  "/online/payment",
  schemaValidationMiddleware(onlinePaymentSchema),
  createOnlinePayment
);

export default paymentRouter;
