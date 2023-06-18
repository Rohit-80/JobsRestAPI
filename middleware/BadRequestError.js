const CustomAPIError = require('./customError')

class BadRrequest extends CustomAPIError {
    constructor(message){
        super(message);
        this.statuscode = 401;
    }
}

module.exports = BadRrequest;