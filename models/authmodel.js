const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const UserSchema = new mongoose.Schema({
    name :{
        type : String,
        required : [true,'please provide name']
      
    },
    email :{
        type : String,
        required : [true,'please provide name'],
        match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'please provide email'],
        unique : true
      
    },
    password : {
        type : String,
        required : [true,'please provide password'],
        minlength : 6,
        
    }
})

UserSchema.pre('save', async function(next){
    const salt = await bcryptjs.genSalt(10);
   this.password = await bcryptjs.hash(this.password,salt)
   next()
})

UserSchema.methods.CreateJWT = function (){
     console.log(process.env.SECRECT)
    return jwt.sign({UserId : this._id, name : this.name}, process.env.SECRECT , {expiresIn:'30d'});
   
}
UserSchema.methods.correctPassword = async function (upassword){
     const ismatch = await bcryptjs.compare(upassword,this.password)
     return ismatch
     
}

const authmodel = mongoose.model('authmodel',UserSchema);
module.exports = authmodel