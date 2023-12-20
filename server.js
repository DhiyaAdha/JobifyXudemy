//packages async errors
import 'express-async-errors';

// dotenv
import * as dotenv from "dotenv";
dotenv.config();

// Express & Morgan
import express from "express";
const app = express();
import morgan from "morgan";
import { body, validationResult } from 'express-validator';

// Routes
import jobRouter from "./routes/jobRouter.js";

// Mongoose
import mongoose from "mongoose";

// Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import e from 'express';

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/test", [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 50 })
    .withMessage('Name must be at least 50 characters long')],
  (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) =>
      error.msg);
      return res.status(400).json({ errors: errorMessages })
  }
  next();
},
  (req, res) => {
  const { name } = req.body;
  res.json({ msg: `hello ${name}` });
});

// Router functions
app.use("/api/v1/jobs", jobRouter);

app.use('*', (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

// Error handler
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server is listening on PORT ${port} ...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}


