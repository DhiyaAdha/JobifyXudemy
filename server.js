// dotenv
import * as dotenv from "dotenv";
dotenv.config();

// Express & Morgan
import express from "express";
const app = express();
import morgan from "morgan";

// Routes
import jobRouter from "./routes/jobRouter.js";

// mongoose
import mongoose from "mongoose";


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

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: "Something went wrong" });
});

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


