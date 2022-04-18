import Joi from "joi";

const cardActivationSchema = Joi.object({
  cardId: Joi.number().required(),
  cvc: Joi.number().required(),
  password: Joi.number().required(),
});

export default cardActivationSchema;
