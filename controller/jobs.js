const jobError = require('../middleware/JobError');
const notFound = require('../middleware/notFoundError');
const jobsModel = require('../models/jobsModel')

const getAllJobs = async (req,res) => {

    const job = await jobsModel.find({createdBy:req.user.UserId}).sort('createdAt');
    res.status(200).json({msg:`All jobs by user`,job})
}



const getJob = async (req,res) => {
    const jobId = req.params.id;
    
    const job = await jobsModel.findOne({_id: jobId, createdBy:req.user.UserId});
    if(!job){
        throw new notFound('NOT FOUND');
    }
    res.status(200).json({msg:'get Jobs', job})
}



const createJob = async (req,res) => {
    
    
    const {company,status,position} = req.body;
    if(!company || !position){
        throw new jobError('pleaes provide job name and company name')
    }
    const Job = await jobsModel.create({company,position,status,createdBy:req.user.UserId})
    
    res.status(200).json({msg:'job created', Job})
}




const updateJobs = async (req,res) => {
    const userId = req.params.id
    const {company,position,status} = req.body;
    if(company === '' || position === ''){
        throw new BadRrequest('Bad Request');
    }
    const job = await jobsModel.findOneAndUpdate({_id: userId, createdBy:req.user.UserId},req.body, { new: true, runValidators: true });
    if(!job){
        throw new notFound(`Not found job with job id - ${userId}`);
    }
    res.status(200).json({msg:'job updated',job})
}



const deleteJobs = async (req,res) => {
    const userId = req.params.id;
    const job = await jobsModel.findOneAndRemove({_id: userId, createdBy:req.user.UserId});
    if(!job){
        throw new notFound(`Not found job with job id - ${userId}`);
    }

    res.status(200).json({msg:'job removed'})
}



module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJobs,
    deleteJobs
}
