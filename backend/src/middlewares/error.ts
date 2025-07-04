import { Request, Response, NextFunction } from 'express';
import { ErrorResponse, ExtendedError } from '../utils/errorResponse';

function errorHandler (err: ErrorResponse | Error, req: Request, res: Response, next: NextFunction) {
  let error: ExtendedError = err;

  if (!(err instanceof ErrorResponse)) {
    error = new ErrorResponse(err.message || 'Internal Server Error', 500);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message || 'Internal Server Error',
      statusCode: error.statusCode || 500,
      errors: 'errors' in error ? error.errors : null,
    },
  });
};

export default errorHandler;