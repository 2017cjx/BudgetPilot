import { Response } from 'express';

export const appResponse = (res: Response, statusCode: number, message: string, data?: any | string | null) => {
  return res.status(statusCode).json({
    status: 'success',
    message: message ?? 'Operation completed successfully',
    data: data ?? null
  });
}