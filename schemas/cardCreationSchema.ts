import Joi from "joi";

const CardCreationSchema = Joi.object({
  type: Joi.string().required(),
  employeeId: Joi.number().required(),
});

export default CardCreationSchema;
