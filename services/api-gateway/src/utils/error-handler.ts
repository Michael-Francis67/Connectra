import type { Request, Response, NextFunction } from 'express';

class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public data?: any;

  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean = true,
    data?: any,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.isOperational,
      message: err.message,
      data: err.data,
    });
  }
  return res.status(500).json({
    status: false,
    message: 'Something went wrong',
  });
};

export { AppError, errorHandler };
