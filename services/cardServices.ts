import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
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
import { compareDates } from "../utils/cardActivationUtils.js";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

export async function createCardService(
  employeeId: number,
  apiKey: string,
  cardType: TransactionTypes
) {
  console.log("chegou aqui no card service");
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
    isVirtual: true,
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
  console.log("cvc: ", cvc);
  console.log("cardInfo.securityCode: ", cardInfo.securityCode);
  if (!bcrypt.compareSync(cvc, cardInfo.securityCode))
    throw unauthorized("verification code");

  cardInfo.password = bcrypt.hashSync(password, 9);
  console.log("cardINfo: ", cardInfo);

  await cardRepository.update(cardId, cardInfo);
}
