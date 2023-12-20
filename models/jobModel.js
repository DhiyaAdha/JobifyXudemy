// Import Mongoose library
import mongoose from "mongoose";

import { JOB_STATUS, JOB_TYPE} from "../utils/constants.js";

// Buat skema pekerjaan (Job Schema)
const jobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS), // Perubahan disini
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE), // Perubahan disini
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
  },
  { timestamps: true }
);

// Export model pekerjaan (Job)
export default mongoose.model("Job", jobSchema);;
