import Joi from "joi";

const paymentSchema = Joi.object({
  password: Joi.number().required(),
  businessId: Joi.number().greater(0).required(),
  amount: Joi.number().greater(0).required(),
});

export default paymentSchema;
