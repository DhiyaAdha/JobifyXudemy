// dotenv
import * as dotenv from "dotenv";
dotenv.config();

// Express & Morgan
import express from "express";
const app = express();
import morgan from "morgan";

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

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server is listening on PORT ${port}`);
});
