const jwt = require("jsonwebtoken")
const UnauthenticatedError = require("./UnAuthenticateError")

const auth = async (req,res,next) =>{
  const header = req.headers.authorization
  
  if(!header || !header.startsWith('Bearer ')) {
    console.log(header)
      throw new UnauthenticatedError('invalid user')
  }

  const token = header.split(' ')[1]
  
   try {
    const decode = await jwt.verify(token,process.env.SECRECT)     
     req.user = { UserId : decode.UserId, name : decode.name}
     next()
   } catch (error) {
       throw new UnauthenticatedError('invalid user')
   }
  

}

module.exports = auth;