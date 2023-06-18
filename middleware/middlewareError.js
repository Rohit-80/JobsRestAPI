const CustomAPIError = require("./customError");

const errorHandlerMiddleware = async (err,req,res,next) =>{
   
    let customError = {
        statusCode : err.statusCode || 500,
        msg : err.message || 'something went wrong'
    }

    if(err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors).map(item => item.message).join(',')
        customError.statusCode = 400
    }
 
    if(err.code && err.code === 11000 ){
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
          customError.statusCode = 400
    }
    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`
        customError.statusCode = 404
      }

       return res.statusCode(customError.statusCode).json({msg : customError.msg});

   // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
    
    
}

module.exports = errorHandlerMiddleware;
