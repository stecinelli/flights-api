import express, { Express, Request, Response } from "express";
import { validate } from "express-validation";
import FlightsController from "./flights.controller";
import FlightRequestSchema from "./flights.schema";

const router = express.Router();


// GET flights (dep/arr, time, cost)
router.get("/", validate(FlightRequestSchema.get), (req: Request, res: Response) => {
  const departureDestination = req.body.departureDestination;
  const arrivalDestination = req.body.arrivalDestination;

  const controller = new FlightsController;
  
  res.json((controller.list(departureDestination, arrivalDestination)));
});

router.get("/test", (req: Request, res: Response) => {
  const body = req.body;
  res.json((body));
});

export default router;