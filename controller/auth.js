const bcryptjs = require('bcryptjs');

const BadRrequest = require('../middleware/BadRequestError');
const authmodel = require('../models/authmodel')
const UnauthenticatedError = require('../middleware/UnAuthenticateError');
const { StatusCodes } = require('http-status-codes');

// Register
const register = async (req,res) => {
    const user = await authmodel.create({...req.body });
    // Creating JWT 
    const token = user.CreateJWT()
    res.status(200).json({msg:"register", token})
}


// Login 
const login = async (req,res) => {

    const {email,password} = req.body;
    console.log(req.body)

    if(!email || !password){
        throw new BadRrequest('Please Provide Email and password');
    }

    const User =  await authmodel.findOne({email});

    if(!User){
        throw new UnauthenticatedError('Invalid Credencial')
    }
    const isPasswordCorrect = await User.correctPassword(password)

   if(!isPasswordCorrect){
       throw new UnauthenticatedError('Invalid Password')
   }

    const token = User.CreateJWT();
    res.status(StatusCodes.OK).json({user : {name : User.name }, token})
}

module.exports ={
    register,
    login
}