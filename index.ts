// Import the express in typescript file
import express , {Request,Response,Application} from 'express';

 
// Initialize the express engine
const app:Application = express();

// Take a port 3000 for running server.
// eslint-disable-next-line @typescript-eslint/ban-types
const port : Number = 3000;
 
// Handling '/' Request
app.get('/', (_req : Request, _res :Response) => {
    _res.send("TypeScript With Express");
});
 
// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);

});

