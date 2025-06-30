import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/user";
import { ErrorResponse } from "../utils/errorResponse";
import asyncHandler from "./async";
import { verifyToken } from "../utils/jwt";
import { UserUsecase } from '../usecases/users'

declare module 'express' {
  interface Request {
    user?: IUser
  }
}

const AUTH_CONSTANTS = {
  BEARER_PREFIX: 'Bearer ',
  COOKIE_NAME: 'token',
  ERROR_MESSAGES: {
    MISSING_AUTH_HEADER: 'Authorization header is missing',
    USER_NOT_FOUND: 'User not found',
    INVALID_TOKEN: 'Invalid token',
    UNAUTHORIZED: 'Unauthorized access',
    TOKEN_EXPIRED: 'Token has expired',
    AUTH_FAILED: 'Authentication failed'
  }
} as const;

const extractToken = (req: Request) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) throw new ErrorResponse(AUTH_CONSTANTS.ERROR_MESSAGES.MISSING_AUTH_HEADER, 401);

  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(AUTH_CONSTANTS.BEARER_PREFIX.length);
  } 
  
  return req.cookies[AUTH_CONSTANTS.COOKIE_NAME] || null;
};

export const authMiddleware = asyncHandler(async (req, res, next) => {
  try {
    const token = extractToken(req);
    
    if (!token) {
      throw new ErrorResponse(AUTH_CONSTANTS.ERROR_MESSAGES.UNAUTHORIZED, 401);
    }
    
    const decoded = await verifyToken(token); 

    if (!decoded || typeof decoded !== 'object' || !('email' in decoded)) {
      throw new ErrorResponse(AUTH_CONSTANTS.ERROR_MESSAGES.USER_NOT_FOUND, 404);
    }

    const user = await UserUsecase.userByEmail(decoded.email);

    if (!user) {
      throw new ErrorResponse(AUTH_CONSTANTS.ERROR_MESSAGES.USER_NOT_FOUND, 404);
    }

    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    next(error instanceof ErrorResponse ? error : new ErrorResponse(AUTH_CONSTANTS.ERROR_MESSAGES.AUTH_FAILED, 500));
  }
})