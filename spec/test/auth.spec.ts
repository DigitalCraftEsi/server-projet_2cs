/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

import { consommateur, sadm } from "@prisma/client";
import {
    onAddConsumerHandler,
  onAddSADMHandler,
  onDeleteConsumerHandler,
  onDeleteSADMHandler,
} from "../../src/services/userService";
import request from "supertest";
import app from "../../index";

const _passswordCrypted =
  "$2b$10$4M6t2/THE6k5nJMZloL6D.nNxLt2RmVxpCcwRzFOaOg7H3HMQZmo6";
const _password = "chamsou2002";

// -- API Auth SADM  
describe("-- API Auth SADM Post /login", async () => {
  let sadmUser: sadm;
  const _data = {
    nomSADM: "chamsou",
    prenomSADM: "berkane",
    emailSADM: "chamsou_sadm@esi.dz",
    motDePasseSADM: _passswordCrypted,
    telephoneSADM : "0664827074"
  };
  beforeAll(async () => {
    sadmUser = await onAddSADMHandler(_data);
  });

  it("should return 200 OK", async (done) => {
    const res = await request(app).post("/login").send({
      email: _data.emailSADM,
      password: _password,
    });
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(sadmUser.idSADM);
    expect(res.body.data.nom).toBe(_data.nomSADM);
    expect(res.body.data.prenom).toBe(_data.prenomSADM);
    expect(res.body.data.email).toBe(_data.emailSADM);
    done();
  });
  
  it("should return 401 Failed - Incorrect email - ", async (done) => {
    const res = await request(app).post("/login").send({
      email: 'IncorrectEmail@esi.dz',
      password: _password,
    });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Incorrect email");
    done();
  });

  it("should return 401 Failed - Incorrect password - ", async (done) => {
    const res = await request(app).post("/login").send({
      email: _data.emailSADM,
      password: "Incorrect2023",
    });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Incorrect password");
    done();
  });

  afterAll(async () => {
    await onDeleteSADMHandler(sadmUser.idSADM);
  });
});


// // -- API Auth consumer  
// describe("-- API Auth consumer Post /login", async () => {
//     let consumer: consommateur;
//     const _data = {
//       nomConsommateur: "chamsou",
//       prenomConsommateur: "berkane",
//       emailConsommateur: "chamsou_consommateur@esi.dz",
//       motDePasseConsommateur: _passswordCrypted,
//       telephoneConsommateur : "0664827074"
//     };

//     beforeAll(async () => {
//       consumer = await onAddConsumerHandler(_data);
//     });
  
//     it("should return 200 OK", async (done) => {
//       const res = await request(app).post("/login").send({
//         email: _data.emailConsommateur,
//         password: _password,
//       });
//       expect(res.status).toBe(200);
//       expect(res.body.data.id).toBe(consumer.idConsommateur);
//       expect(res.body.data.nom).toBe(_data.nomConsommateur);
//       expect(res.body.data.prenom).toBe(_data.prenomConsommateur);
//       expect(res.body.data.email).toBe(_data.emailConsommateur);
//       done();
//     });
    
  
//     it("should return 401 Failed - Incorrect password - ", async (done) => {
//       const res = await request(app).post("/login").send({
//         email: _data.emailConsommateur,
//         password: "Incorrect2023",
//       });
//       expect(res.status).toBe(401);
//       expect(res.body.message).toBe("Incorrect password");
//       done();
//     });
  
//     // afterAll(async () => {
//     //   await onDeleteConsumerHandler(consumer.idConsommateur);
//     // });
//   });
  
