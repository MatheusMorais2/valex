import Joi from "joi";

const onlinePaymentSchema = Joi.object({
  cardNumber: Joi.number().required(),
  cardName: Joi.string().required(),
  expirationDate: Joi.string().required(),
  verificationCode: Joi.number().required(),
  businessId: Joi.number().required(),
  amount: Joi.number().required(),
});

export default onlinePaymentSchema;
