import Joi from "joi";

export const schema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": "name must be a string",
    "string.empty": "name cannot be an empty field",
    "string.min": "Name must be at least 3 characters long",
    "any.required": "name is a required field",
  }),
  value: Joi.string().min(3).required().messages({
    "string.base": "value must be a string",
    "string.empty": "value cannot be an empty field",
    "string.min": "value must be at least 3 characters long",
    "any.required": "value is a required field",
  }),
  edition: Joi.string()
    .required()
    .messages({ "string.required": "edition is a required field" }),
}).messages({ "object.base": "Both name and value are required" });
