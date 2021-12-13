const { ValidationError } = require('sequelize');
function errorMiddleware(error, req, res, next) {
    let { status = 500, message, data } = error;
    
    console.log("Se presento error->",error)

    if (error instanceof ValidationError) {       
        message = error.errors[0].message
        status = 403
        console.log("error seq->",error)
    }

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
