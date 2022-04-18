import { badRequest, notFoundError, unauthorized } from "../utils/errors.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as businessRepository from "../repositories/businessRepository.js";
import { compareDates } from "../utils/cardActivationUtils.js";
import bcrypt from "bcrypt";
import { getCardExtract } from "./cardServices.js";

export async function createPayment(
  cardId: number,
  businessId: number,
  amount: number,
  password: string
) {
  const cardInfo = await cardRepository.findById(cardId);
  if (!cardInfo) throw notFoundError("card");

  if (!compareDates(cardInfo.expirationDate)) throw unauthorized("date");

  if (password.length !== 4) throw badRequest("password");

  const passwordVerification = bcrypt.compareSync(password, cardInfo.password);
  if (!passwordVerification) throw unauthorized("password");

  const businessInfo = await businessRepository.findById(businessId);
  if (!businessInfo) throw notFoundError("business");
  if (businessInfo.type !== cardInfo.type) throw unauthorized("business type");

  const balance = (await getCardExtract(cardId)).balance;
  console.log("balance: ", balance);

  if (amount > balance) throw unauthorized("balance");

  await paymentRepository.insert({ cardId, businessId, amount });
}
