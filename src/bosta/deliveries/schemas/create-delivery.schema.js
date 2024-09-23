import Joi from "joi";

export const deliverySchema = Joi.object({
  type: Joi.number().required().messages({
    "any.required": "Delivery type is required",
    "number.base": "Delivery type must be a number",
  }),
  specs: Joi.object({
    size: Joi.string().valid(
      "SMALL",
      "MEDIUM",
      "LARGE",
      "Light Bulky",
      "Heavy Bulky"
    ),
    packageType: Joi.string().valid(
      "Parcel",
      "Document",
      "Light Bulky",
      "Heavy Bulky"
    ),
    packageDetails: Joi.object(),
  }),
  returnSpecs: Joi.object({
    size: Joi.string().valid(
      "SMALL",
      "MEDIUM",
      "LARGE",
      "Light Bulky",
      "Heavy Bulky"
    ),
    packageType: Joi.string().valid(
      "Parcel",
      "Document",
      "Light Bulky",
      "Heavy Bulky"
    ),
    packageDetails: Joi.object(),
  }).description(
    "For CRP and Exchange orders to define specs of returned shipment."
  ),
  notes: Joi.string(),
  returnNotes: Joi.string().description("Only for Exchange or CRP"),
  cod: Joi.number().required().max(30000).messages({
    "any.required": "COD amount is required",
    "number.base": "COD amount must be a number",
    "number.max": "COD amount must not exceed 30,000",
  }),
  dropOffAddress: Joi.object({
    city: Joi.string().required(),
    zoneId: Joi.string(),
    districtId: Joi.string().required(),
    firstLine: Joi.string().required(),
    secondLine: Joi.string(),
    floor: Joi.string(),
    apartment: Joi.string(),
    buildingNumber: Joi.string(),
    isWorkAddress: Joi.boolean(),
  }).required(),
  pickupAddress: Joi.object({
    city: Joi.string().required(),
    zoneId: Joi.string(),
    districtId: Joi.string().required(),
    firstLine: Joi.string().required(),
    secondLine: Joi.string(),
    floor: Joi.string(),
    apartment: Joi.string(),
    buildingNumber: Joi.string(),
    isWorkAddress: Joi.boolean(),
  }).description(
    "For Exchange orders only, Address of the business location to return the exchanged order to."
  ),
  returnAddress: Joi.object({
    city: Joi.string(),
    zoneId: Joi.string(),
    districtId: Joi.string(),
    firstLine: Joi.string(),
    secondLine: Joi.string(),
    floor: Joi.string(),
    apartment: Joi.string(),
    buildingNumber: Joi.string(),
    isWorkAddress: Joi.boolean(),
  }),
  allowToOpenPackage: Joi.boolean(),
  businessReference: Joi.string(),
  uniqueBusinessReference: Joi.string().description(
    "A unique identifier for your order. This reference must be unique across all orders in your system and should not be duplicated."
  ),
  receiver: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    fullName: Joi.string(),
    phone: Joi.string().required(),
    secondPhone: Joi.string(),
    email: Joi.string().email(),
  }).required(),
  webhookUrl: Joi.string().uri(),
  webhookCustomHeaders: Joi.object(),
  businessLocationId: Joi.string(),
}).messages({
  "object.unknown": "Unknown field: {{#label}}",
});
