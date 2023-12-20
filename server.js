// packages async errors
import "express-async-errors";

// dotenv
import dotenv from "dotenv";
dotenv.config();

// Express & Morgan
import express from "express";
import morgan from "morgan";

// Mongoose
import mongoose from "mongoose";

// Middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

import jobRouter from "./routes/jobRouter.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

// Use jobRouter
app.use("/api/v1/jobs", jobRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 404 Not Found handler
app.use("*", (req, res) => {
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
