import Job from "../models/jobModel.js";

// status http
import { StatusCodes } from "http-status-codes";

// package encrypt id random
import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
}
 
export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
    
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  if (!updatedJob) {
    res.status(404).json({ msg: `no job with id ${id}` });
    return;
  }

  // validasi mesg
  // if (!company || !position) {
  //   res.status(400).json({ error: "Please provide company or position" });
  //   return;
  // }

  // job.company = company;
  // job.position = position;

  res.status(StatusCodes.OK).json({ msg: "job updated", job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  if (!removedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  
  res.status(StatusCodes.OK).json({ msg: "job deleted", job: removedJob });
};