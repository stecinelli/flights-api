import express, { Express, Request, Response, NextFunction, ErrorRequestHandler } from "express";
import expressValidation from 'express-validation';

import dotenv from "dotenv";
dotenv.config();

import apiRoutes from "./routes/index"

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json())
app.use("/api", apiRoutes);

app.use((err: unknown, _: Request, res: Response, next: NextFunction) => {
  if (err instanceof expressValidation.ValidationError) {
    res.status(err.statusCode).json(err);
  } else {
    console.log(err);
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});