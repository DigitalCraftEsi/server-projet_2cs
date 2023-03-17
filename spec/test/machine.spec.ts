/* eslint-disable no-undef */

import request from 'supertest';
import app from "../../index"


// -- API Machine  GET /machine
describe('-- API Machine  GET /machine', async () => {
  it('should return 200 OK',async (done) => {
    const res  = await request(app).get("/machine")
    expect(res.status).toBe(200)
    done()
  });
});

// -- API Machine  GET /machine/:id
describe('-- API machine  GET /machine/:id', async () => {
    let id : number;
    beforeAll( async ()=>{
      const data = {
        "longitude" : 20,
      "latitude" : 30,
      "adresse"  : "Alger - Algeria",
      "codeDeDeverrouillage" : "2002"
    }
      const res = await request(app).post("/machine").send(data);
      id = res.body.data.idDistributeur
    })
    it('should return 200 OK',async (done) => {
      const res  = await request(app).get(`/machine/${id}`)
      expect(res.status).toBe(200)
      expect(res.body.data.idDistributeur).toBe(id)
      done()
    });

    it('should return 400 Bad Request',async (done) => {
        const id = -2 ;
        const res  = await request(app).get(`/machine/${id}`)
        expect(res.status).toBe(400)
        done()
    });
    afterAll( async() =>{
         await request(app).delete("/machine/"+id)
    })

  });

  // -- API machine Post /machine
  describe('-- API machine Post /machine', async () => {

    let id : number 
    it('should return 200 OK',async (done) => {
        const data = {
          "longitude" : 20,
          "latitude" : 30,
          "adresse"  : "Alger - Algeria",
          "codeDeDeverrouillage" : "2002"
        }
      const res  = await request(app).post("/machine").send(data);
      id = res.body.data.idDistributeur
      expect(res.status).toBe(200)
      expect(res.body.data.longitude).toBe(data.longitude)
      expect(res.body.data.latitude).toBe(data.latitude)
      expect(res.body.data.adresse).toBe(data.adresse)
      expect(res.body.data.codeDeDeverrouillage).toBe(data.codeDeDeverrouillage)
      done()
    });

    it('should return 400 Bad Request',async (done) => {
        const data = {
            "longitude" : 20,
            // "latitude" : 30,
            "adresse"  : "Alger - Algeria",
            "codeDeDeverrouillage" : "2002"
          }
        const res  = await request(app).post("/machine").send(data);
          expect(res.status).toBe(400)
          done()
      });

      afterAll( async () => { 
        await request(app).delete('/machine/'+id);
    } )

  })

  // -- API machine Update /machine/:id
  describe('-- API machine Update /machine/:id', async () => {

    let id : number;
    beforeAll( async ()=>{
        const data = {
            "longitude" : 20,
            "latitude" : 30,
            "adresse"  : "Alger - Algeria",
            "codeDeDeverrouillage" : "2002"
          }
      const res = await request(app).post("/machine").send(data);
      id = res.body.data.idDistributeur
    })

    it('should return 200 OK',async (done) => {
      const data = {
        "longitude" : 20,
    }
      const res  = await request(app).post("/machine/"+id).send(data);
      expect(res.status).toBe(200)
      expect(res.body.data.longitude).toEqual(data.longitude)
      done()
    });

    it('should return 400 Bad Request',async (done) => {
      const id = -2 ;
      const data = {
        "longitude" : 20
     }
      const res  = await request(app).post("/machine/"+id).send(data);
      expect(res.status).toBe(400)
      done()
      });

      afterAll(async() => {
        await request(app).delete('/machine/'+id)
      })
  })

  
  // -- API machine Delete /machine/:id
  describe('-- API machine Delete /machine/:id', async () => {
    let id : number;
    beforeEach( async ()=>{
        const data = {
            "longitude" : 20,
            "latitude" : 30,
            "adresse"  : "Alger - Algeria",
            "codeDeDeverrouillage" : "2002"
          }
      const res = await request(app).post("/machine").send(data);
      id = res.body.data.idDistributeur
    })

    it('should return 200 OK',async (done) => {
      const res  = await request(app).delete("/machine/"+id)
      expect(res.status).toBe(200)
      done()
    });

    it('should return 400 Bad Request',async (done) => {
      const id = -2 ;
      const res  = await request(app).delete("/machine/"+id)
      expect(res.status).toBe(400)
      done()
      });
  })

