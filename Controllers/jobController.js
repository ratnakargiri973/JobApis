import mongoose from "mongoose";
import JobModel from "../Model/jobModel.js";

export const createJobs = async (req, res) => {
    try {
        const {title, description, companyName, location, employmentType, salary} = req.body;

        const newJobToAdd = new JobModel({
            title, 
            description, 
            companyName, 
            location, 
            employmentType, 
            salary
        });

        const response = await newJobToAdd.save();
        res.status(201).send({message: "Job posted successfully", response});
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getJobs = async (req, res) => {
    try {
        let query = {};

        if(req.query.title){
            query.title = { $regex: new RegExp(req.query.title, "i") }
        }
  
        if(req.query.companyName){
            query.companyName = { $regex: new RegExp(req.query.companyName, "i") }
        }

        const jobs = await JobModel.find(query);
        res.status(200).send(jobs);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getSingleJob = async (req, res) => {
    const {id} = req.params;
    try {
        if(!id){
            return res.status(404).send({message: "Given ID is not found"});
        }

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({message: "Given ID is not in proper format"});
        }

        const singleJob = await JobModel.findById(id);

        if(!singleJob){
            return res.status(404).send({message: "No Job is found with that ID"});
        }

        res.status(200).send(singleJob);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateJob = async (req, res) => {
    const {id} = req.params;

    const {
        title, 
        description, 
        companyName, 
        location, 
        employmentType, 
        salary
    } = req.body;

    try {
        if(!id){
            return res.status(404).send({message: "Given ID is not found"});
        }

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({message: "Given ID is not in proper format"});
        }

        const updatedJob = await JobModel.findByIdAndUpdate(id, {
            title, 
            description, 
            companyName, 
            location, 
            employmentType, 
            salary
        });

        if(!updatedJob){
            return res.status(404).send({message: "No Job is found with that ID"});
           };
    
           res.status(200).send({message: "The job with given id has been updated successfully", updatedJob});
    } catch (error) {
        res.status(500).send(error);
    }
}

export const deleteJob = async (req, res) => {

    const {id} = req.params;
    try {
        if(!id){
            return res.status(404).send({message: "Given ID is not found"});
        }

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({message: "Given ID is not in proper format"});
        }

        const bookToDelete = await JobModel.findByIdAndDelete(id);

        if(!bookToDelete){
            return res.status(404).send({message: "No Job is found with that ID"});
           };

        res.status(200).send({message: "The boook with given id is deleted successfully", bookToDelete});

    } catch (error) {
        res.status(500).send(error);
    }
}