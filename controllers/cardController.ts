import { Request, Response } from "express";
import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js";
import {
  findByTypeAndEmployeeId,
  insert,
  TransactionTypes,
} from "../repositories/cardRepository.js";
import dayjs from "dayjs";
import { createCardService } from "../services/cardServices.js";
import { validateCardType } from "../utils/cardCreationUtils.js";

export async function createCard(req: Request, res: Response) {
  const employeeId: number = parseInt(req.body.employeeId);
  const cardType: TransactionTypes = req.body.type;
  const apiKey: any = req.headers["x-api-key"];

  if (!validateCardType(cardType))
    return res.status(422).send("Invalid card type");

  createCardService(employeeId, apiKey, cardType);

  return res.sendStatus(201);
}
