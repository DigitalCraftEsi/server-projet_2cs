// Import the express in typescript file
declare global {
  namespace Express {
     interface Request {
        user?: object
     }
  }
}

import express , {Application, NextFunction , Request , Response} from 'express';
import { ApiError, BadRequestError, ErrorType, InternalError } from './src/handler/apiError';
import authRouter from './src/routers/authRouter';
import machinRouter from './src/routers/vendingMachineRouter';

 
// Initialize the express engine
const app:Application = express();
app.use(express.urlencoded({extended : true}))
app.use(express.json({limit: '50mb'}));

// Take a port 3000 for running server.
// eslint-disable-next-line @typescript-eslint/ban-types
const port : Number = 8000;
 

 
// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);

});
app.use('/', authRouter);
app.use('/machine', machinRouter);


const errorHandler = (err : Error, req:Request, res:Response, next:NextFunction) => {
  console.log(err)
  if (err instanceof ApiError) {
    ApiError.handle(<ApiError>err, res);
      if (err.type === ErrorType.INTERNAL)
        console.log(
          `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
        );
    } else {
      console.log(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      );
      console.log(err);
      if (process.env.NODE_ENV === 'development') {
        return res.status(500).send(err);
      }
      ApiError.handle(new InternalError(), res);
    }

}

app.use(errorHandler)
