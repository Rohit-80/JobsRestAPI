
class CustomAPIError extends Error{
    constructor(message,statuscode){
        super(message)
        this.message = this.message;
        this.statuscode = statuscode;
    }
}

module.exports = CustomAPIError;