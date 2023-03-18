/* eslint-disable no-undef */

import { adm } from '@prisma/client';
import request from 'supertest';

import app from "../../index"


// -- API Creation of Users  POST /user
describe('-- API Creation User ADM  POST /user', async () => {

  let adm : adm;
  let cookies : string;
  beforeAll( async () => {
    const _data = {
        "email" : "chamsou@gmail.com",
        "password"  :"chamsou2002"
    }
    const _res = await request(app).post("/login").send(_data)
    cookies =_res.headers["set-cookie"]

  })
  it('should return 200 OK',async (done) => {
    const _data = {
            nom: "chamsou",
            prenom: "chamsou",
            email: "chamsou_ADM@esi.dz",
            "telephone": "0664827074",
            "password" : "chamsou2002",
            "client" : 1 ,
            "role"  : "ADM"
    }
    const _res  = await request(app).post("/user").send(_data).set("Cookie",cookies)
    adm = _res.body.data;
    expect(_res.status).toBe(201)
    done()
  });

  it('should return 401 AuthFailure',async (done) => {

    const _data = {
            nom: "chamsou",
            prenom: "chamsou",
            email: "chamsou_ADM@esi.dz",
            "telephone": "0664827074",
            "password" : "chamsou2002",
            "client" : 1 ,
            "role"  : "ADM"
    }
    const _res  = await request(app).post("/user").send(_data)
    expect(_res.status).toBe(401)
    done()
  });

  afterAll( async ()=>{
    await request(app).delete("/user").send(
        {
            "role"  :"ADM",
            "id" : adm.idADM
        }
    ).set("Cookie",cookies)
  })
});


// -- API Delete  Users  DELETE /user
describe('-- API Delete User ADM  DELETE /user', async () => {

    let adm : adm;
    let cookies : string;
    beforeAll( async () => {
      const _dataAuth = {
          "email" : "chamsou@gmail.com",
          "password"  :"chamsou2002"
      }
      const _resAuth = await request(app).post("/login").send(_dataAuth)
      cookies =_resAuth.headers["set-cookie"]
      const _data = {
        nom: "chamsou",
        prenom: "chamsou",
        email: "chamsou_ADM@esi.dz",
        "telephone": "0664827074",
        "password" : "chamsou2002",
        "client" : 1 ,
        "role"  : "ADM"
    }
    const _res  = await request(app).post("/user").send(_data).set("Cookie",cookies)
    adm = _res.body.data;
  
    })
    it('should return 200 OK',async (done) => {

        const _res  = await request(app).delete("/user").send({
            "role"  :"ADM",
            "id" : adm.idADM
        }).set("Cookie",cookies)      
      expect(_res.status).toBe(200)
      done()
    });
  
    it('should return 401 AuthFailure',async (done) => {
  
      const _res  = await request(app).delete("/user").send({
        "role"  :"ADM",
        "id" : adm.idADM
    })
      expect(_res.status).toBe(401)
      done()
    });
  

  });