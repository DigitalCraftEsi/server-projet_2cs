/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

import request from 'supertest';
import app from "../../index"
import { AuthDataOfTest } from '../../src/utils/data';


// -- API Machine  GET /machine
describe('-- API Machine  GET /machine', async () => {
  it('should return 200 OK',async (done) => {

    const _resAuth = await request(app).post("/login").send(AuthDataOfTest.authSADM)
    const cookies =_resAuth.headers["set-cookie"]
    const res  = await request(app).get("/machine").set("Cookie",cookies)
    expect(res.status).toBe(200)
    done()
  });
});

// -- API Machine  GET /machine/:id
describe('-- API machine  GET /machine/:id', async () => {
    let id : number;
    let cookies : string;
    beforeAll( async ()=>{

      const _resAuth = await request(app).post("/login").send(AuthDataOfTest.authSADM)
       cookies =_resAuth.headers["set-cookie"]
      
      const data = {
        "longitude" : 20,
        "latitude" : 30,
        "adresse"  : "Setif - Algeria",
      "distuid" : "99",
      "odbuid" : "99"
    }

      const res = await request(app).post("/machine").send(data).set("Cookie",cookies);
      id = res.body.data.idDistributeur
    })
    it('should return 200 OK',async (done) => {
      const res  = await request(app).get(`/machine/${id}`).set("Cookie",cookies);
      expect(res.status).toBe(200)
      expect(res.body.data.idDistributeur).toBe(id)
      done()
    });

    it('should return 400 Bad Request',async (done) => {
        const id = -2 ;
        const res  = await request(app).get(`/machine/${id}`).set("Cookie",cookies);
        expect(res.status).toBe(400)
        done()
    });
    afterAll( async() =>{
         await request(app).delete("/machine/"+id).set("Cookie",cookies);
    })

  });

  // -- API machine Post /machine
  describe('-- API machine Post /machine', async () => {
    let cookies : string;
    let id : number 
    beforeAll( async ()=>{

      const _resAuth = await request(app).post("/login").send(AuthDataOfTest.authSADM)
       cookies =_resAuth.headers["set-cookie"]
    })


    it('should return 200 OK',async (done) => {
        const data = {
          "longitude" : 20,
          "latitude" : 30,
          "adresse"  : "Setif - Algeria",
        "distuid" : "99",
        "odbuid" : "99"
        }
      const res  = await request(app).post("/machine").send(data).set("Cookie",cookies);
      id = res.body.data.idDistributeur
      expect(res.status).toBe(200)
      expect(res.body.data.longitude).toBe(data.longitude)
      expect(res.body.data.latitude).toBe(data.latitude)
      expect(res.body.data.adresse).toBe(data.adresse)
      done()
    });

    it('should return 400 Bad Request',async (done) => {
        const data = {
            "longitude" : 20,
            // "latitude" : 30,
            "adresse"  : "Alger - Algeria",
          }
        const res  = await request(app).post("/machine").send(data).set("Cookie",cookies);
          expect(res.status).toBe(400)
          done()
      });

      afterAll( async () => { 
        await request(app).delete('/machine/'+id).set("Cookie",cookies);
    } )

  })

  // -- API machine Update /machine/:id
  describe('-- API machine Update /machine/:id', async () => {

    let id : number;
    let cookiesSadm : string;
    let cookiesAdm : string;
    beforeAll( async ()=>{

    const _res = await request(app).post("/login").send(AuthDataOfTest.authSADM)
    cookiesSadm =_res.headers["set-cookie"]
    const _resAdm = await request(app).post("/login").send(AuthDataOfTest.authADM)
    cookiesAdm = _resAdm.headers["set-cookie"];
        const data = {
          "longitude" : 20,
          "latitude" : 30,
          "adresse"  : "Setif - Algeria",
          "distuid" : "99",
          "odbuid" : "99"
          }
      const res = await request(app).post("/machine").send(data).set("Cookie",cookiesSadm);
      id = res.body.data.idDistributeur
    })

    it('should return 200 OK',async (done) => {
      const data = {
        "longitude" : 20,
    }
      const res  = await request(app).post("/machine/"+id).send(data).set("Cookie",cookiesAdm);
      expect(res.status).toBe(200)
      expect(res.body.data.longitude).toEqual(data.longitude)
      done()
    });

    it('should return 400 Bad Request',async (done) => {
      const id = -2 ;
      const data = {
        "longitude" : 20
     }
      const res  = await request(app).post("/machine/"+id).send(data).set("Cookie",cookiesAdm);
      expect(res.status).toBe(400)
      done()
      });

      afterAll(async() => {
        await request(app).delete('/machine/'+id).set("Cookie",cookiesSadm);
      })
  })

  
  // -- API machine Delete /machine/:id
  describe('-- API machine Delete /machine/:id', async () => {
    let id : number;
    let cookies : string
    beforeEach( async ()=>{

      const _resAuth = await request(app).post("/login").send(AuthDataOfTest.authSADM)
       cookies =_resAuth.headers["set-cookie"]
        const data = {
          "longitude" : 20,
          "latitude" : 30,
          "adresse"  : "Setif - Algeria",
          "distuid" : "99",
          "odbuid" : "99"
          }
      const res = await request(app).post("/machine").send(data).set("Cookie",cookies);
      id = res.body.data.idDistributeur
    })

    it('should return 200 OK',async (done) => {
      const res  = await request(app).delete("/machine/"+id).set("Cookie",cookies);
      expect(res.status).toBe(200)
      done()
    });

    it('should return 400 Bad Request',async (done) => {
      const id = -2 ;
      const res  = await request(app).delete("/machine/"+id).set("Cookie",cookies);
      expect(res.status).toBe(400)
      done()
      });
  })

