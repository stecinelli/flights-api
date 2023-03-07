import Joi from "joi";

export default {
  get: {
    body: Joi.object({
      departureDestination: Joi.string().required(),
      arrivalDestination: Joi.string().required(),
      date: Joi.date(),
      maxPrice: Joi.number(),
    }),
  },
}