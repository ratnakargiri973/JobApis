import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      companyName: {
        type: String,
        required: true
      },
      location: {
        city: String,
        state: String,
        country: String
      },
      employmentType: {
        type: String,
        enum: ["Full-Time", "Part-Time", "Contract", "Temporary", "Internship"]
      },
      salary: {
        type: Number
      }
   }, 
{timestamps: true});

const JobModel = mongoose.model('job', jobSchema);
export default JobModel;

