// Import Mongoose library
import mongoose from "mongoose";

// Buat skema pekerjaan (Job Schema)
const jobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full time", "part time", "internship"],
      default: "full time",
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
