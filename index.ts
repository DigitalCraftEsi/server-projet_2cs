/* eslint-disable @typescript-eslint/no-namespace */
// Import the express in typescript file

import express , {Application} from 'express';
import { errorHandler } from './src/handler/errorHandler';
import baverageRouter from './src/routers/beverageRouter';
import orderRouter from './src/routers/orderRouter';
import machinRouter from './src/routers/vendingMachineRouter';
import authRouter from './src/routers/authRouter';

declare global {
  namespace Express {
     interface Request {
        user?: object
     }
  }
}



 
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
app.use("/beverage",baverageRouter);
app.use("/order",orderRouter);
app.use(errorHandler)

export default app


