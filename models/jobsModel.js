const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company : {
        type : String,
        required : [true,'please provide company code'],
        maxlength : 50
    },
    position : {
        type : String,
        required : [true,'Please Provide Position']

    },
    status : {
        type : String,
         enum : ['interview','declined','pending'],
         default : 'pending'
    },
    createdBy:{
     type : mongoose.Types.ObjectId,
     ref: 'authmodel',
     required : [true,'please Provide']
    }
    
}, {
    timestamps : true
   }
   )

   const jobsModel = mongoose.model('jobsModel', JobSchema);
   
   module.exports = jobsModel;