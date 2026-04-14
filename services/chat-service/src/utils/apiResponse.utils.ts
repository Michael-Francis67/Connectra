import type { Response } from 'express';

export class ApiResponse {
  success(
    res: Response,
    message?: string,
    data?: any,
    statusCode: number = 200,
  ) {
    return res.status(statusCode).json({ message, data });
  }

  error(res: Response, message?: string, data?: any, statusCode: number = 400) {
    return res.status(statusCode).json({ message, data });
  }
}
