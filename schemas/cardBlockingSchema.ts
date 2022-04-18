import Joi from "joi";

const cardBlockingSchema = Joi.object({
  password: Joi.string().required(),
});

export default cardBlockingSchema;
