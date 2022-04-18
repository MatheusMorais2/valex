import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository.js";
import * as paymentServices from "../services/paymentServices.js";

export async function createPayment(req: Request, res: Response) {
  const cardId: number = parseInt(req.params.id);
  const businessId: number = parseInt(req.body.businessId);
  const amount: number = parseInt(req.body.amount);
  const password: string = req.body.password;

  await paymentServices.createPayment(cardId, businessId, amount, password);
  return res.sendStatus(201);
}

export async function createOnlinePayment(req: Request, res: Response) {
  const cardNumber: string = req.body.cardNumber;
  const cardName: string = req.body.cardName;
  const expirationDate: string = req.body.expirationDate;
  const verificationCode: string = req.body.verificationCode;
  const businessId: number = req.body.businessId;
  const amount: number = req.body.amount;

  await paymentServices.createOnlinePayment(
    cardNumber,
    cardName,
    expirationDate,
    verificationCode,
    businessId,
    amount
  );
  return res.sendStatus(201);
}
