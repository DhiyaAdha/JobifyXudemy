// dotenv
import * as dotenv from "dotenv";
dotenv.config();

// Express & Morgan
import express from "express";
const app = express();
import morgan from "morgan";
import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

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

// GET all jobs
app.get("/api/v1/jobs", (req, res) => { 
  res.status(200).json({ jobs });
});

// CREATE a job
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    // 400 Bad Request handling
    res.status(400).json({ error: "Please provide company and position" });
    return;
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(200).json({ job });
});

// GET a single job
app.get("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `no job with id ${id}` });
    return;
  }
  res.status(200).json({ job });
});

// UPDATE/EDIT a job
app.patch("/api/v1/jobs/:id", (req, res) => {
  const { company, position } = req.body;
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    res.status(404).json({ msg: `no job with id ${id}` });
    return;
  }

  if (!company || !position) {
    res.status(400).json({ error: "Please provide company or position" });
    return;
  }

  job.company = company;
  job.position = position;

  // const newJobs = jobs.map((job) => {
  //   if (job.id === id) {
  //     job.company = company ? company : job.company;
  //     job.position = position ? position : job.position;
  //   }
  //   return job;
  // });
  // jobs = newJobs;
  res.status(200).json({ msg: "job updated", job });
});

// DELETE a job
app.delete("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ msg: "job deleted", jobs });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server is listening on PORT ${port}`);
});
