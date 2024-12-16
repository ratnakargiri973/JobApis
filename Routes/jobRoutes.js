import express from 'express';
import { createJobs, deleteJob, getJobs, getSingleJob, updateJob } from '../Controllers/jobController.js';

const jobRouter = express.Router();

jobRouter.post('/job/add', createJobs);
jobRouter.get('/job/get', getJobs);
jobRouter.get('/job/get/:id', getSingleJob);
jobRouter.put('/job/update/:id', updateJob);
jobRouter.delete('/job/delete/:id', deleteJob);


export default jobRouter;