/* eslint-disable no-undef */

import { client } from '@prisma/client';
import request from 'supertest';
import app from "../../index"


// -- API Creation of client  POST /user
describe('-- API Creation User Client  POST /user', async () => {

    let client : client;
    let cookiesSadm : string;
    let cookiesAdm : string;
    beforeAll( async () => {
      const _dataSadm = {
          "email" : "chamsou@gmail.com",
          "password"  :"chamsou2002"
      }
      const _dataAdm = {
        "email" : "chamsou_ADM@esi.dz",
        "password"  :"chamsou2002"
    }
      const _res = await request(app).post("/login").send(_dataSadm)
      cookiesSadm =_res.headers["set-cookie"]
      const _resAdm = await request(app).post("/login").send(_dataAdm)
      cookiesAdm = _resAdm.headers["set-cookie"];
  
    })
    it('should return 200 OK',async (done) => {
      const _data = {
              nom: "client",
              email: "client_test@esi.dz",
              "telephone": "0664827074",
              "password" : "chamsou2002",
              "role"  : "CLIENT"
      }
      const _res  = await request(app).post("/user").send(_data).set("Cookie",cookiesSadm)
      client = _res.body.data;
      expect(_res.status).toBe(201)
      done()
    });
  
    it('it should return 403 Permission denied',async (done) => {
      const _data = {
        nom: "client",
        email: "client_test2@esi.dz",
        "telephone": "0664827074",
        "password" : "chamsou2002",
        "role"  : "CLIENT"
      }
      const _res  = await request(app).post("/user").send(_data).set("Cookie",cookiesAdm)
      expect(_res.status).toBe(403)
      expect(_res.body.message).toBe("Permission denied");
      done()
    });
  
    it('should return 401 AuthFailure',async (done) => {
      const _data = {
        nom: "client",
        email: "client_test3@esi.dz",
        "telephone": "0664827074",
        "password" : "chamsou2002",
        "role"  : "CLIENT"
      }
      const _res  = await request(app).post("/user").send(_data)
      expect(_res.status).toBe(401)
      done()
    });
  
    afterAll( async ()=>{
      await request(app).delete("/user").send(
          {
              "role"  :"CLIENT",
              "id" : client.idClient
          }
      ).set("Cookie",cookiesSadm)
    })
  });
  
  
  //-- API Delete  Users  DELETE /user
describe('-- API Delete User ADM  DELETE /adm', async () => {

    let client : client;
    let cookies : string;
    beforeAll( async () => {
      const _dataAuth = {
          "email" : "chamsou@gmail.com",
          "password"  :"chamsou2002"
      }
      const _resAuth = await request(app).post("/login").send(_dataAuth)
      cookies =_resAuth.headers["set-cookie"]
      const _data = {
        nom: "client",
        email: "client_test2@esi.dz",
        "telephone": "0664827074",
        "password" : "chamsou2002",
        "role"  : "CLIENT"
      }
    const _res  = await request(app).post("/user").send(_data).set("Cookie",cookies)
    client = _res.body.data;
  
    })
    it('should return 200 OK',async (done) => {

        const _res  = await request(app).delete("/user").send({
            "role"  :"CLIENT",
            "id" : client.idClient
        }).set("Cookie",cookies)      
      expect(_res.status).toBe(200)
      done()
    });
  
    it('should return 401 AuthFailure',async (done) => {
  
      const _res  = await request(app).delete("/user").send({
        "role"  :"CLIENT",
        "id" : client.idClient
    })
      expect(_res.status).toBe(401)
      done()
    });

  });