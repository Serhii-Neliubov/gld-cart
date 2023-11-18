import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api-error';
import TokenService from '../services/token-service';

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authorizationHeader = req.headers.authorization as string;

  if (!authorizationHeader) {
    console.log("no access token was provided");
    return next(ApiError.UnauthorizedError());
  }

  const accessToken = authorizationHeader.split(' ')[1];
  if (!accessToken) {
    console.log("invalid access token");
    return next(ApiError.UnauthorizedError());
  }
  const userData = TokenService.validateAccessToken(accessToken);

  if (!userData) {
    return next(ApiError.UnauthorizedError());
  }
  res.locals.user = userData;
  next();
};
export const requireAuthWithGoogle = (req: Request, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies.accessToken as string;

  if (!accessToken) {
    console.log("no access token was provided");
    return next(ApiError.UnauthorizedError());
  }
  const userData = TokenService.validateAccessToken(accessToken);

  if (!userData) {
    console.log("access token is invalid");
    return next(ApiError.UnauthorizedError());
  }
  res.locals.accessToken = accessToken;
  res.locals.user = userData;
  next();
};
