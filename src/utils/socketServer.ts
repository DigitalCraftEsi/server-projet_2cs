// const express = require("express");
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const cookie = require("cookie")
// const {} = requi
// const io = new Server(httpServer);

// let map = {}
// const client = 2
// const distId = 3

// io.use((socket, next) => {
//     const auth = JSON.parse(socket.handshake.headers.auth)
//     const UID = auth.payload.rasbUID;
//     console.log(auth);
//     if (UID === '3') {

//         socket.idClient = client;
//         socket.idDist = distId;
//         socket.distUID = UID;

//         next()
//     } else {
//         next(new Error("blyaat"))
//     }
// });


// let jutos;

// io.on("connection", (socket) => {

//     // if the connected user is ac or wrvr, add him to a room sub-<client>-<distId>
//     // so you can later broadcast in it periodically
//     // var cookies = cookie.parse(socket.handshake.headers.cookie);
//     // console.log(cookies);

//     // console.log(socket.handshake.headers);

//     // // check if distID is not already present
//     const distUID = socket.distUID
//     console.log("A client with UID " + distUID + " has joined the room");
//     if (!map[socket.idClient]) {
//         map[socket.idClient] = [socket]
//     } else {
//         map[socket.idClient].push(socket)
//     }

//     console.log("User joined");
//     jutos = socket
//     socket.on("disconnect", (reason) => {
//         //distributeur only
//         console.log("Disconnected");
//         // map[socket.idClient] = map[socket.idClient].filter(function (s) {
//         //     return s.id != socket.id;
//         // });
//     });

// });

// httpServer.listen(3000);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.post("/payed", (req, res) => {
//     // console.log(req.body.idDist);
//     // const socket = map[client]?.find(s => s.idDist = req.body.idDist)
//     // if (!socket) {
//     //     res.status(503).send()
//     // } else{
//     //     socket.emit("prepare-beverage", {
//     //         boissons : [{container1 : 2}]
//     //     })
//     //     res.status(200).send()
//     // }
//     jutos.emit("prepare-beverage", {
//         boissons: [{ container1: 90 }]
//     })
//     res.status(200).send()
// })