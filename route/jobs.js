const express = require('express');
const jobsrouter = express.Router()
const {getAllJobs,getJob,createJob,updateJobs,deleteJobs} = require('../controller/jobs');
const auth = require('../middleware/Authnetication');

jobsrouter.route('/').get(auth,getAllJobs).post(auth,createJob)
jobsrouter.route('/:id').get(auth,getJob).delete(auth,deleteJobs).patch(auth,updateJobs)




module.exports = jobsrouter;