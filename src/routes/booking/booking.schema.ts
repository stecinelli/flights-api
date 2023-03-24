import Joi from "joi";

export default {
  get: {
    body: Joi.object({
      email: Joi.string().email(),
      flight_id: Joi.string(),
    }),
  },
  post: {
    body: Joi.object({
      flight_id: Joi.string().required(),
      bookedSeats: Joi.number().required(),
      userName: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
  },
  delete: {
    body: Joi.object({
      flight_id: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
  },
  put: {
    body: Joi.object({
      flight_id: Joi.string().required(),
      bookedSeats: Joi.number(),
      userName: Joi.string(),
      email: Joi.string().email().required(),
    }),
  },
}