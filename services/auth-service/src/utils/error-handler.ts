import type { Request, Response, NextFunction } from 'express';

class AppError extends Error {
  private statusCode: number;
  private isOperational: boolean;
  private data?: any;

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
