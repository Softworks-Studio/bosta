const Joi = require("joi");

const updateDeliverySchema = Joi.object({
  allowToOpenPackage: Joi.boolean().messages({
    "boolean.base": "Allow to open package must be a boolean value",
  }),
  cod: Joi.number().min(0).messages({
    "number.base": "COD must be a number",
    "number.min": "COD must be a non-negative number",
  }),
  dropOffAddress: Joi.object({
    districtId: Joi.string().messages({
      "string.empty": "District ID cannot be empty",
    }),
    firstLine: Joi.string().messages({
      "string.empty": "First line of address cannot be empty",
    }),
    secondLine: Joi.string(),
    floor: Joi.string(),
    apartment: Joi.string(),
    buildingNumber: Joi.string(),
    isWorkAddress: Joi.boolean().messages({
      "boolean.base": "Is work address must be a boolean value",
    }),
    city: Joi.object({
      _id: Joi.string().required().messages({
        "any.required": "City ID is required",
        "string.empty": "City ID cannot be empty",
      }),
      name: Joi.string().required().messages({
        "any.required": "City name is required",
        "string.empty": "City name cannot be empty",
      }),
    }),
  }),
  receiver: Joi.object({
    phone: Joi.string()
      .pattern(/^[0-9]{11}$/)
      .messages({
        "string.pattern.base": "Phone number must be 11 digits",
      }),
    secondPhone: Joi.string()
      .pattern(/^[0-9]{11}$/)
      .messages({
        "string.pattern.base": "Second phone number must be 11 digits",
      }),
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });

module.exports = updateDeliverySchema;
