/* eslint-disable @typescript-eslint/ban-types */

import { Socket } from "socket.io";
import { socketClientsTypesEnum } from "../../enums/socketClientsEnum";
import { onGetMachineBydistUIDHandler, onGetMachineHander } from "../../services/machinService";
import cookie from "cookie"
import jwt, { TokenExpiredError } from "jsonwebtoken"
import { createCookie, createTokens, userJwtPayload } from "../../utils/token";
import { ROLES } from "../../enums/rolesEnum";
// const io = new Server(httpServer)

type authBody = {
    type: string,
    payload: any,
}

type socketObject = {
    isBusy: boolean,
    distributeurSocket: Socket | null
}

const socketMap: { [idDistributeur: string]: socketObject } = {}

const ioMiddleware = async (socket: Socket, next: Function) => {
    // console.log(socket.handshake.headers.auth);

    if (!socket.handshake.headers.auth) {
        next(new Error("Authentication object not provided"))
    }


    const auth = JSON.parse(socket.handshake.headers.auth as string) as authBody
    const type = auth.type;

    // Hard coded values
    // const client = 4;
    // const idDist = 6;

    switch (type) {
        case socketClientsTypesEnum.DISTRIBUTEUR: {
            const UID = auth.payload.distUID

            //get distributeur with UID
            const distributeur = await onGetMachineBydistUIDHandler(UID);
            if (!distributeur) {
                return next(new Error("Machine not found"))
            }

            socket.data.type = type;
            socket.data.idClient = distributeur.idClient;
            socket.data.idDist = distributeur.idDistributeur;

            if (!socketMap[socket.data.idDist]) {
                socketMap[socket.data.idDist] =
                {
                    isBusy: false,
                    distributeurSocket: socket
                }
            } else {

                next(new Error("Duplicated vending machine connections"))
            }

            break;
        }
        case socketClientsTypesEnum.AGENT: {
            const token: string = cookie.parse(socket.handshake.headers.cookie).accessToken;
            if (!token) {
                next(new Error('login_required'))
            }

            let decoded: any;
            let tokenIsExpired = false;

            try {
                decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as {
                    user: userJwtPayload,
                }
            } catch (err: unknown) {
                if (err instanceof TokenExpiredError) {
                    decoded = jwt.decode(token) as {
                        user: userJwtPayload,
                    }
                    tokenIsExpired = true
                } else {
                    next(new Error());
                }
            }

            if (decoded?.user.role != ROLES.ADM
                && decoded?.user.role != ROLES.DECIDEUR)
                next(new Error("unauthorized"));

            if (tokenIsExpired) {
                next(new Error('token_expired'));

            }

            socket.data.type = type;
            socket.data.idClient = decoded?.user.clientId

            next();
            break;
        }

        default:
            next(new Error("unauthorized"))
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

    if (socket.data.type === 'DISTRIBUTEUR') {
        socket.join(`client-${socket.data.idClient}-room`);
    }else{
        console.log(socket.data.type + " of client " + socket.data.idClient +", is connected");
    }


    socket.on("disconnect", (_) => {
        //distributeur only

        if (socket.data.type == socketClientsTypesEnum.DISTRIBUTEUR) {
            console.log(socket.data.type + " of client " + socket.data.idClient
                + ", vending machine " + socket.data.idDist + ", has disconnected");

            delete socketMap[socket.data.idDist]
        }
    });

    socket.on('get_machine_status', async (idDistributeur: number, callback: Function) => {
        const distributeur = await onGetMachineHander(idDistributeur);
        if (!distributeur || distributeur.idClient !== socket.data.idClient) {
            return socket.emit('vending_machine_unknown')
        }

        const distSocket = socketMap[idDistributeur]
        if (!distSocket) {
            return socket.emit('vending_machine_offline')
        }

        distSocket.distributeurSocket.emit('get_machine_status', (responseData) => {
            callback(responseData)
        })

    })

    socket.on('get_machines_positions', (callback : Function) => {
        let socketsCount = Object.keys(socketMap).length;
        let ackCount = -1;

        let status: { [idDistributeur: string]: any } = {}

        socket.to(`client-${socket.data.idClient}-room`).emit('get_machines_positions', (responseData)=>{
            status[responseData.idDistributeur] = responseData;
            ackCount++;
            if(ackCount == socketsCount){
                callback(status)
            }
        });
    })

};

export { ioMiddleware, onConnectionHandler, socketMap };