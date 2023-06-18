const CustomAPIError = require('./customError')

class UnauthenticatedError extends CustomAPIError {
    constructor(message){
        super(message);
        this.statuscode = 402;
    }
}

module.exports = UnauthenticatedError;