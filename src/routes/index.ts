import express, { Express, Request, Response } from "express";
import BookingRoutes from "./booking/booking.routes"
import FlightsRoutes from "./flights/flights.routes"

const router = express.Router();

router.use("/booking", BookingRoutes);
router.use("/flights", FlightsRoutes);

export default router;