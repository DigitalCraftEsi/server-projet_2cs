/* eslint-disable no-undef */

import { adm } from '@prisma/client';
import request from 'supertest';
import app from "../../index"
import { AuthDataOfTest } from '../../src/utils/data';

// -- API Creation of ADM  POST /user
describe('-- API Creation User ADM  POST /user', async () => {

  let adm : adm;
  let cookies : string;
  let cookiesAdm : string;
  let client : any ;
  beforeAll( async () => {
    const _res = await request(app).post("/login").send(AuthDataOfTest.authSADM)
    cookies =_res.headers["set-cookie"]
    const _resAdm = await request(app).post("/login").send(AuthDataOfTest.authADM)
    cookiesAdm = _resAdm.headers["set-cookie"];
    const _data = {
      nom: "client",
      email: "client_test2@esi.dz",
      "telephone": "0664827074",
      "password" : "chamsou2002",
      "role"  : "CLIENT"
    }
    const _res_client  = await request(app).post("/user").send(_data).set("Cookie",cookies)
    client = _res_client.body.data
  })
  it('should return 200 OK',async (done) => {
    const _data = {
            nom: "chamsou",
            prenom: "chamsou",
            email: "chamsou_ADM_test@esi.dz",
            "telephone": "0664827074",
            "password" : "chamsou2002",
            "client" : client.idClient ,
            "role"  : "ADM"
    }
    const _res  = await request(app).post("/user").send(_data).set("Cookie",cookies)
    adm = _res.body.data;
    expect(_res.status).toBe(201)
    done()
  });



  it('it should return 403 Permission denied',async (done) => {
    const _data = {
            nom: "chamsou",
            prenom: "chamsou",
            email: "chamsou_ADM_test3@esi.dz",
            "telephone": "0664827074",
            "password" : "chamsou2002",
            "client" :  client.idClient  ,
            "role"  : "ADM"
    }
    const _res  = await request(app).post("/user").send(_data).set("Cookie",cookiesAdm)
    expect(_res.status).toBe(403)
    expect(_res.body.message).toBe("Permission denied");
    done()
  });

  it('should return 401 AuthFailure',async (done) => {
    const _data = {
            'nom': "chamsou",
            'prenom': "chamsou",
            'email': "chamsou_ADM_test4@esi.dz",
            "telephone": "0664827074",
            "password" : "chamsou2002",
            "client" :99 ,
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
    await request(app).delete("/user").send(
      {
          "role"  :"CLIENT",
          "id" : client.idClient
      }
  ).set("Cookie",cookies)
  })
});

// ########################################################################


