import type { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  data?: any;
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

export class BadRequestError extends AppError {
  constructor(message: string, data?: any) {
    super(message, 400, true, data);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, data?: any) {
    super(message, 404, true, data);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, data?: any) {
    super(message, 409, true, data);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string, data?: any) {
    super(message, 401, true, data);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string, data?: any) {
    super(message, 403, true, data);
  }
}

export class tooManyRequestsError extends AppError {
  constructor(message: string, data?: any) {
    super(message, 429, true, data);
  }
}

export const errorHandler = (
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
    message: 'Internal Server Error',
  });
};
