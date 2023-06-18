const CustomAPIError = require('./customError')

class notFound extends CustomAPIError {
    constructor(message){
        super(message);
        this.statuscode = 404;
    }
}

module.exports = notFound;