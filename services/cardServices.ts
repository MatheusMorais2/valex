import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import { TransactionTypes } from "../repositories/cardRepository.js";
import {
  buildCardName,
  buildExpirationDate,
  buildCardNumber,
} from "../utils/cardCreationUtils.js";
import {
  unauthorized,
  notFoundError,
  duplicateError,
  badRequest,
} from "../utils/errors.js";
import { getBalance } from "../utils/balanceUtils.js";
import { compareDates } from "../utils/cardActivationUtils.js";
import bcrypt from "bcrypt";

export async function createCardService(
  employeeId: number,
  apiKey: string,
  cardType: TransactionTypes
) {
  const companyInfo = await companyRepository.findByApiKey(apiKey);
  if (!companyInfo) throw unauthorized("apiKey");

  const employeeInfo = await employeeRepository.findById(employeeId);
  if (!employeeInfo) throw notFoundError("employee");

  const cardInfo = await cardRepository.findByTypeAndEmployeeId(
    cardType,
    employeeId
  );
  if (cardInfo) throw duplicateError("card");

  const cvc = JSON.stringify(Math.floor(Math.random() * 1000));

  let cardDetails = {
    employeeId,
    flag: "Mastercard",
    number: buildCardNumber(),
    cardholderName: buildCardName(employeeInfo.fullName),
    expirationDate: buildExpirationDate(),
    securityCode: bcrypt.hashSync(cvc, 9),
    isVirtual: false,
    isBlocked: false,
    type: cardType,
  };

  await cardRepository.insert(cardDetails);
  return cvc;
}

export async function activateCardService(
  cardId: number,
  cvc: string,
  password: string
) {
  const cardInfo = await cardRepository.findById(cardId);
  if (!cardInfo) throw notFoundError("card");

  if (!compareDates(cardInfo.expirationDate)) throw unauthorized("date");

  if (password.length !== 4) throw badRequest("password");

  if (cardInfo.password) throw duplicateError("activation");

  if (!bcrypt.compareSync(cvc, cardInfo.securityCode))
    throw unauthorized("verification code");

  cardInfo.password = bcrypt.hashSync(password, 9);

  await cardRepository.update(cardId, cardInfo);
}

export async function getCardExtract(cardId: number) {
  const cardInfo = await cardRepository.findById(cardId);
  if (!cardInfo) throw notFoundError("card");

  const payments = await paymentRepository.findByCardId(cardId);
  const recharges = await rechargeRepository.findByCardId(cardId);

  const balance = getBalance(payments, recharges);

  return { balance, transactions: payments, recharges };
}

export async function blockCardService(cardId: number, password: string) {
  const cardInfo = await cardRepository.findById(cardId);
  if (!cardInfo) throw notFoundError("card");

  if (!compareDates(cardInfo.expirationDate)) throw unauthorized("date");

  if (cardInfo.isBlocked) throw unauthorized("block");

  const passwordVerification = bcrypt.compareSync(password, cardInfo.password);
  if (!passwordVerification) throw unauthorized("password");

  cardInfo.isBlocked = true;

  await cardRepository.update(cardId, cardInfo);
}

export async function unblockCardService(cardId: number, password: string) {
  const cardInfo = await cardRepository.findById(cardId);
  if (!cardInfo) throw notFoundError("card");

  if (!compareDates(cardInfo.expirationDate)) throw unauthorized("date");

  if (!cardInfo.isBlocked) throw unauthorized("block");

  const passwordVerification = bcrypt.compareSync(password, cardInfo.password);
  if (!passwordVerification) throw unauthorized("password");

  cardInfo.isBlocked = false;

  await cardRepository.update(cardId, cardInfo);
}
