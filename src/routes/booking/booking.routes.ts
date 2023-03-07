import express, { Express, Request, Response } from "express";

const router = express.Router();

// POST (make the booking) -- verificar se user ja tem uma reserva para este voo, se sim fazer put
// GET (see all the bookings)
// PUT (change qnt on one book)
// DELETE (delete one booking)
router.get("/", (req: Request, res: Response) => {
  const body = req.body;
  res.json((body));
});

export default router;