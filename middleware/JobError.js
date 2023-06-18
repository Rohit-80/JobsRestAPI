const CustomAPIError = require('./customError')

class jobError extends CustomAPIError {
    constructor(message){
        super(message);
        this.statuscode = 401;
    }
}

module.exports = jobError;