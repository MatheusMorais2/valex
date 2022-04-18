import { badRequest, notFoundError, unauthorized } from "../utils/errors.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import { compareDates } from "../utils/cardActivationUtils.js";

export async function rechargeCard(
  cardId: number,
  amount: number,
  apiKey: string
) {
  const companyInfo = await companyRepository.findByApiKey(apiKey);
  if (!companyInfo) throw unauthorized("apiKey");

  const cardInfo = await cardRepository.findById(cardId);
  if (!cardInfo) throw notFoundError("card");

  if (!compareDates(cardInfo.expirationDate)) throw unauthorized("date");

  if (!amount) throw badRequest("amount");
  if (amount <= 0) throw badRequest("amount");

  await rechargeRepository.insert({ amount, cardId: cardInfo.id });
}
