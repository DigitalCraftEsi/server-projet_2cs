// Import the express in typescript file
import express , {Application} from 'express';
import authRouter from './routers/authRouter';

 
// Initialize the express engine
const app:Application = express();
app.use(express.urlencoded({extended : true}))
app.use(express.json({limit: '50mb'}));

// Take a port 3000 for running server.
// eslint-disable-next-line @typescript-eslint/ban-types
const port : Number = 3000;
 

 
// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);

});


app.use('/user',authRouter);

