import Joi from "joi";

export default {
  get: {
    body: Joi.object({
      departureDestination: Joi.string(),
      arrivalDestination: Joi.string(),
      date: Joi.date(),
      maxPrice: Joi.number(),
    }),
  },
}