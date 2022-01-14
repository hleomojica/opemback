const {
    ValidationError
} = require('sequelize');

function errorMiddleware(error, req, res, next) {
    let {
        status = 500, message, data
    } = error;

    if (error && error.parent) {
        if (error.parent.errno === 1451) {
            message = "El registro se encuentra asociado"
            status = 409
        } else if (error.parent.errno === 1062) {
            message = "El registro ya existe"
            status = 403
        }
    }

    //console.log("------- Se presento error--->>>>", error)
    //console.log("------- Se presento name--->>>>", error.parent)
    /*
        if (error instanceof ValidationError) {
            message = error.errors[0].message
            status = 403
            console.log("error seq->", error)
        }
    */
    // If status code is 500 - change the message to Intrnal server error
    message = status === 500 || !message ? 'Internal server error' : message;

    error = {
        type: 'error',
        status,
        message,
        ...(data) && data
    }

    res.status(status).send(error);
}

module.exports = errorMiddleware;