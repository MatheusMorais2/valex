import Joi from "joi";

const CardCreationSchema = Joi.object({
  type: Joi.string().required(),
  employeeCpf: Joi.string().required(),
});

export default CardCreationSchema;
