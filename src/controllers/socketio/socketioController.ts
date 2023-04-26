/* eslint-disable @typescript-eslint/ban-types */

import { Socket } from "socket.io";
import { socketClientsTypesEnum } from "../../enums/socketClientsEnum";
import { onGetMachineByOdbUIDHandler, onGetMachineBydistUIDHandler } from "../../services/machinService";

// const io = new Server(httpServer)

type authBody = {
    type: string,
    payload: any,
}

type socketObject = {
    isBusy: boolean,
    distributeurSocket: Socket | null,
    odbSocket: Socket | null
}

const socketMap: { [idDistributeur: string]: socketObject } = {}

const ioMiddleware = async (socket: Socket, next: Function) => {
    // console.log(socket.handshake.headers.auth);
    
    if (!socket.handshake.headers.auth) {
        next(new Error("Authentication object not provided"))
    }
    

    const auth = JSON.parse(socket.handshake.headers.auth as string) as authBody
    const type = auth.type;
    let UID;

    // Hard coded values
    // const client = 4;
    // const idDist = 6;

    switch (type) {
        case socketClientsTypesEnum.DISTRIBUTEUR: {
            UID = auth.payload.distUID

            //get distributeur with UID
            const distributeur = await onGetMachineBydistUIDHandler(UID);
            if(!distributeur){
                return next(new Error("Machine not found"))
            }

            socket.data.type = type;
            socket.data.idClient = distributeur.idClient;
            socket.data.idDist = distributeur.idDistributeur;

            if (!socketMap[socket.data.idDist]) {
                socketMap[socket.data.idDist] =
                {
                    isBusy: false,
                    distributeurSocket: socket,
                    odbSocket: null
                }
            } else {
                if (socketMap[socket.data.idDist].distributeurSocket != null) {
                    next(new Error("Duplicated vending machine connections"))
                } else {
                    socketMap[socket.data.idDist].distributeurSocket = socket
                }
            }

            break;
        }
        case socketClientsTypesEnum.ODB: {
            UID = auth.payload.rasbUID
            

            //get odb with UID
            const distributeur = await onGetMachineByOdbUIDHandler(UID);
            if(!distributeur){
                return next(new Error("Machine not found"))
            }
            socket.data.type = type;
            socket.data.idClient = distributeur.idClient;
            socket.data.idDist = distributeur.idDistributeur;

            if (!socketMap[socket.data.idDist]) {
                socketMap[socket.data.idDist] =
                {
                    isBusy: false,
                    distributeurSocket: null,
                    odbSocket: socket
                }
            } else {

                if (socketMap[socket.data.idDist].odbSocket != null) {
                    next(new Error("Duplicated vending machine connections"))
                } else {
                    socketMap[socket.data.idDist].odbSocket = socket
                }
            }

            break;
        }

        default:
            next(new Error("Type invalid"))
            break;
    }
    next()
};

const onConnectionHandler = (socket: Socket) => {

    // if the connected user is ac or wrvr, add him to a room sub-<client>-<distId>
    // so you can later broadcast in it periodically
    // var cookies = cookie.parse(socket.handshake.headers.cookie);
    // console.log(cookies);

    // console.log(socket.handshake.headers);

    // // check if distID is not already present

    console.log(socket.data.type + " of client " + socket.data.idClient
        + ", vending machine " + socket.data.idDist + ", is connected");

    socket.on("disconnect", (_) => {
        //distributeur only
        console.log(socket.data.type + " of client " + socket.data.idClient
            + ", vending machine " + socket.data.idDist + ", has disconnected");
    });

};

export { ioMiddleware, onConnectionHandler, socketMap };