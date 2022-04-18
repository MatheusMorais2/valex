import { Request, Response } from "express";
import * as rechargeServices from "../services/rechargeServices.js";

export async function rechargeCard(req: Request, res: Response) {
  const cardId: number = parseInt(req.params.id);
  const amount: number = parseInt(req.body.amount);
  const apiKey: any = req.headers["x-api-key"];

  await rechargeServices.rechargeCard(cardId, amount, apiKey);
  return res.sendStatus(201);
}
