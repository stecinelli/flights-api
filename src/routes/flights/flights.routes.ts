import express, { Express, Request, Response } from "express";
import { validate } from "express-validation";
import FlightsController from "./flights.controller";
import FlightRequestSchema from "./flights.schema";

const router = express.Router();


router.get("/", validate(FlightRequestSchema.get), (req: Request, res: Response) => {
  const departureDestination: string = req.body.departureDestination;
  const arrivalDestination: string = req.body.arrivalDestination;
  const date: string = req.body.date;

  const controller = new FlightsController;

  res.json((controller.list(departureDestination, arrivalDestination, date)));
});

// TEST (for connection check)
router.get("/test", (req: Request, res: Response) => {
  const body = req.body;
  res.json((body));
});

export default router;