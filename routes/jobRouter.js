import { Router } from "express";
import {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import { validateJobInput } from "../middleware/validationMiddleware.js";

const jobRouter = Router();

jobRouter.route("/").get(getAllJobs).post(validateJobInput, createJob);

jobRouter
  .route("/:id")
  .get(getJob)
  .patch(validateJobInput, updateJob)
  .delete(deleteJob);

export default jobRouter;
