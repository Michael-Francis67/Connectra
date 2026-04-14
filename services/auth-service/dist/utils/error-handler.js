class AppError extends Error {
    statusCode;
    isOperational;
    data;
    constructor(message, statusCode, isOperational = true, data) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.data = data;
        Error.captureStackTrace(this, this.constructor);
    }
}
export {};
