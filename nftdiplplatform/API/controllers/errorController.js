const AppError = require("../Utils/appError");

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;

    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(?<=")(?:\\.|[^"\\])*(?=")/);
    console.log(value);
    const message = `Duplicate field values ${value}. Please use anoter value`;
    return new AppError(message, 400);
};

const handleJWTError = () => new AppError("Invalod token, Please log in again", 401);

const handleJWTExpiredError = () => new AppError("Your Token got expired please login again", 401);

const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map(el => el.messaage);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
      });
};

const sendErrorPro = (err, res) => {
    if (err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
          });
    } else {
        res.status(500).json({
            status: "error",
            message: "Something went very wrong",
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if(process.env.NODE_ENV === "development"){
        sendErrorDev(err, res);
        // let error = {...err};
        // if(error.name === "CastError") error = handleCastErrorDB(error);
        // if(error.code === 11000) error = handleDuplicateFieldsDB(error);
        // if(error.name === "ValidationError") error = handleValidationError(error);
        // if(error.name === "JsonWebTokenError") error = handleJWTError();
        // if(error.name === "TokenExpiredError") error = handleJWTExpiredError();
    } else if (process.env.NODE_ENV === "production"){
        let error = {...err};
        if(error.name === "CastError") error = handleCastErrorDB(error);
        if(error.code === 11000) error = handleDuplicateFieldsDB(error);
        if(error.name === "ValidationError") error = handleValidationError(error);
        if(error.name === "JsonWebTokenError") error = handleJWTError();
        if(error.name === "TokenExpiredError") error = handleJWTExpiredError();

        sendErrorPro(error, res);
    }
    next();
  };