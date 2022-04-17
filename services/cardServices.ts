import { findByApiKey } from "../repositories/companyRepository.js";
import { findById } from "../repositories/employeeRepository.js";
import {
  findByTypeAndEmployeeId,
  insert,
  TransactionTypes,
} from "../repositories/cardRepository.js";
import {
  buildCardName,
  buildExpirationDate,
  buildCardNumber,
} from "../utils/cardCreationUtils.js";
import {
  unauthorized,
  notFoundError,
  duplicateError,
} from "../utils/errors.js";

export async function createCardService(
  employeeId: number,
  apiKey: string,
  cardType: TransactionTypes
) {
  console.log("chegoiu aqui");
  const companyInfo = await findByApiKey(apiKey);
  if (!companyInfo) throw unauthorized("apiKey");

  const employeeInfo = await findById(employeeId);
  if (!employeeInfo) throw notFoundError("employee");

  const cardInfo = await findByTypeAndEmployeeId(cardType, employeeId);
  if (cardInfo) throw duplicateError("card");

  let cardDetails = {
    employeeId,
    flag: "Mastercard",
    number: buildCardNumber(),
    cardholderName: buildCardName(employeeInfo.fullName),
    expirationDate: buildExpirationDate(),
    securityCode: JSON.stringify(Math.floor(Math.random() * 1000)),
    isVirtual: true,
    isBlocked: false,
    type: cardType,
  };

  await insert(cardDetails);
}
