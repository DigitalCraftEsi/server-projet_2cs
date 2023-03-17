/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction , Request , Response} from 'express';
import { ApiError, ErrorType, InternalError } from '../handler/apiError';

/**
 * A middleware function that is designed to handle errors that occur during the processing of a request .
 * @param {Error} err -  object represents an error that occurred during the processing of the request .
 * @param {Request} req - object represents an incoming HTTP request .
 * @param {Response} res - object represents the server's response to an HTTP request .
 */
export const errorHandler = (err : Error, req:Request, res:Response , next : NextFunction ) => {
    if (err instanceof ApiError) {
      ApiError.handle(<ApiError>err, res);
      //   if (err.type === ErrorType.INTERNAL)
      //     console.log(
      //       `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      //     );
      // } else {
      //   console.log(
      //     `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      //   );
        // if (process.env.NODE_ENV === 'development') {
        //   return res.status(500).send(err);
        // }
        // ApiError.handle(new InternalError(), res);
      }
  
  }