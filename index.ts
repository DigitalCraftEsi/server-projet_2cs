/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-namespace */
// Import the express in typescript file
import { userJwtPayload } from "./src/utils/token";
declare global {
  namespace Express {
    interface Request {
      user?: userJwtPayload;
    }
  }
}

declare global {
  namespace Socket {
    interface Socket {
      data?: object;
    }
    interface IncomingHttpHeaders {
      auth?: string;
    }
  }
}

import express, { Application } from "express";
import { errorHandler } from "./src/handler/errorHandler";
import baverageRouter from "./src/routers/beverageRouter";
import orderRouter from "./src/routers/orderRouter";
import authRouter from "./src/routers/authRouter";
import machinRouter from "./src/routers/vendingMachineRouter";
import userRouter from "./src/routers/usersRouter";
import compression from "compression";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import {
  ioMiddleware,
  onConnectionHandler,
} from "./src/controllers/socketio/socketioController";
import { Server } from "socket.io";
import advrtRouter from "./src/routers/advertisementRouter";
import advertiserRouter from "./src/routers/advertiserRouter";
import cardRouter from "./src/routers/cardRouter";
import profileRouter from "./src/routers/profileRouter";
import reclamationRouter from "./src/routers/ReclamationRouter";
import responseRouter from "./src/routers/responseRouter";
import taskAmRouter from "./src/routers/taskAmRouter";
import statisticRouter from "./src/routers/statistic";

// Initialize the express engine

export const app: Application = express();

let corsOptions: CorsOptions = {
  origin: ["http://localhost:3000", "0.0.0.0", "*"],
  credentials: true,
};

const httpServer = createServer(app);
const io = new Server(httpServer);


app.use('/src/uploads', express.static('src/uploads'));

app.use(express.static('src/uploads'));

io.use(ioMiddleware);

io.on("connection", onConnectionHandler);

app.use(compression());

app.use(cors(corsOptions));

//to parse everything to json
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

// Take a port 3000 for running server.
// eslint-disable-next-line @typescript-eslint/ban-types
const port: Number = 8000;

httpServer.listen(port, () => {
  console.log(`TypeScript with Express
      http://localhost:${port}/`);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get("/", async (req, res, next) => {
  console.log("first");
  res.send("Welcom with us :)");
});

app.use("/order", orderRouter);
app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/machine", machinRouter);
app.use("/beverage", baverageRouter);
app.use("/advertisement", advrtRouter);
app.use("/advertiser", advertiserRouter);
app.use("/card", cardRouter);
app.use("/profile", profileRouter);
app.use("/reclamation", reclamationRouter);
app.use("/response",responseRouter)
app.use("/profile", profileRouter);
app.use("/task",taskAmRouter);
app.use("/statistic",statisticRouter)

app.use(errorHandler);

export default app;
