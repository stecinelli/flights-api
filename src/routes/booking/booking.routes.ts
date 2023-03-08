import express, { Express, Request, Response } from "express";
import { validate } from "express-validation";
import BookingController from "./booking.controller";
import BookingRequestSchema from "./booking.schema";
import IBooking from "../../types/booking.types"

const router = express.Router();

// POST (make the booking)
router.post("/", validate(BookingRequestSchema.post), (req: Request, res: Response) => {
  const newBooking: IBooking = req.body;
  const controller = new BookingController;
  res.status((controller.add(newBooking))).json()
});

// GET (see all the bookings or for specific flight)
router.get("/", validate(BookingRequestSchema.get), (req: Request, res: Response) => {
  const email: string = req.body.email;
  const flight_id: string = req.body.flight_id;

  const controller = new BookingController;

  let bookingList: Array<IBooking> = [];

  flight_id
    ? bookingList = controller.list(email, flight_id)
    : bookingList = controller.list(email);

  !bookingList || bookingList.length <= 0
    ? res.status(400).json()
    : res.json(bookingList)
});

// PUT (change qnt or userName on one bokking) -- verificar disponibilidade do voo
router.put("/", validate(BookingRequestSchema.put), (req: Request, res: Response) => {
  const email: string = req.body.email;
  const flight_id: string = req.body.flight_id;
  const userName: string | undefined = req.body.userName;
  const bookedSeats: number | undefined = req.body.bookedSeats;

  const controller = new BookingController;

  email && flight_id 
  ? res.status((controller.edit(email, flight_id, userName, bookedSeats))).json()
  : res.status(400).json()

});
// DELETE (delete one booking)
router.delete("/", validate(BookingRequestSchema.delete), (req: Request, res: Response) => {
  const email: string = req.body.email;
  const flight_id: string = req.body.flight_id;

  const controller = new BookingController;
  res.status((controller.delete(email, flight_id))).json()
});

// TEST (for connection check)
router.get("/test", (req: Request, res: Response) => {
  const body: object = req.body;
  res.json((body));
});

export default router;