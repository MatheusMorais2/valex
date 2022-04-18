import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository.js";
import {
  createCardService,
  activateCardService,
  getCardExtract,
  blockCardService,
  unblockCardService,
} from "../services/cardServices.js";
import { validateCardType } from "../utils/cardCreationUtils.js";

export async function createCard(req: Request, res: Response) {
  const employeeId: number = parseInt(req.body.employeeId);
  const cardType: TransactionTypes = req.body.type;
  const apiKey: any = req.headers["x-api-key"];

  if (!validateCardType(cardType))
    return res.status(422).send("Invalid card type");

  const cvc = await createCardService(employeeId, apiKey, cardType);
  return res.status(201).send(`Security code: ${cvc}`);
}

export async function activateCard(req: Request, res: Response) {
  const cardId: number = parseInt(req.body.cardId);
  const cvc: string = req.body.cvc;
  const password: string = req.body.password;
  console.log("chegou aqui no activate card controller");

  await activateCardService(cardId, cvc, password);

  return res.sendStatus(200);
}

export async function getExtract(req: Request, res: Response) {
  const cardId: number = parseInt(req.params.id);

  const extract = await getCardExtract(cardId);

  return res.status(200).send(extract);
}

export async function blockCard(req: Request, res: Response) {
  const cardId: number = parseInt(req.params.id);
  const password: string = req.body.password;

  await blockCardService(cardId, password);

  return res.sendStatus(200);
}

export async function unblockCard(req: Request, res: Response) {
  const cardId: number = parseInt(req.params.id);
  const password: string = req.body.password;

  await unblockCardService(cardId, password);

  return res.sendStatus(200);
}
