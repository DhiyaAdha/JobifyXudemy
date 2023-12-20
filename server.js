//packages async errors
import 'express-async-errors';

// dotenv
import * as dotenv from "dotenv";
dotenv.config();

// Express & Morgan
import express from "express";
const app = express();
import morgan from "morgan";

// Routes
import jobRouter from "./routes/jobRouter.js";

// Mongoose
import mongoose from "mongoose";

// Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "Post request received!", data: req.body });
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


