import Job from "../models/jobModel.js";

import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

export const getAllJobs = async (req, res) => {
    res.status(200).json({ jobs });
}
 
export const createJob = async (req, res) => {
      const job = await Job.create(req.body);
      res.status(200).json({ job });
};
    
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    res.status(404).json({ msg: `no job with id ${id}` });
    return;
  }
  res.status(200).json({ job });
};

export const updateJob = async (req, res) => {
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
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;
  res.status(200).json({ msg: "job deleted", jobs });
};