import { Router } from "express";
import {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

const jobRouter = Router();

jobRouter.route("/").get(getAllJobs).post(validateJobInput, createJob);

jobRouter
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(validateJobInput, updateJob)
  .delete(validateIdParam, deleteJob);

export default jobRouter;
