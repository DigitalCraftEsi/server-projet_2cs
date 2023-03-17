/* eslint-disable no-undef */

import request from 'supertest';

import app from "../../index"


// -- API order  GET /order
describe('-- API order  GET /order', async () => {
  it('should return 200 OK',async (done) => {
    const res  = await request(app).get("/order")
    expect(res.status).toBe(200)
    done()
  });
});

// -- API order  GET /order/:id
describe('-- API order  GET /order/:id', async () => {

    it('should return 200 OK',async (done) => {
      const id = 4 ;
      const res  = await request(app).get(`/order/${id}`)
      expect(res.status).toBe(200)
      expect(res.body.data.idCommande).toBe(id)
      done()
    });

    it('should return 400 Bad Request',async (done) => {
        const id = -2 ;
        const res  = await request(app).get(`/order/${id}`)
        expect(res.status).toBe(400)
        done()
      });

  });

  // -- API order Post /order
  describe('-- API order Post /order', async () => {

    let id : number
    it('should return 200 OK',async (done) => {
      const data = {
        "dateCommande" : "2023-03-17T15:30:00.000Z" ,
        "idConsommateur" : 1,
        "idDistributeur" : 1
    }
      const res  = await request(app).post("/order").send(data);
      id = res.body.data.idCommande
      expect(res.status).toBe(200)
      expect(res.body.data.dateCommande).toBe(data.dateCommande)
      done()
    });

    it('should return 400 Bad Request',async (done) => {
        const data = {
            "dateCommande" : "2023-03-17T15:30:00Z" ,
            // "idConsommateur" : 1,
            "idDistributeur" : 1
        }   
        const res  = await request(app).post("/order").send(data);
          expect(res.status).toBe(400)
          done()
      });
    
      afterAll( async () => { 
        await request(app).delete('/order/'+id);
    } )

  })

  // -- API order Update /order/:id
  describe('-- API order Update /order/:id', async () => {

    let id : number;
    beforeAll( async ()=>{
      const data = {
        "dateCommande" : "2023-03-17T15:30:00Z" ,
        "idConsommateur" : 1,
        "idDistributeur" : 1
    }
      const res = await request(app).post("/order").send(data);
      id = res.body.data.idCommande
    })
    it('should return 200 OK',async (done) => {
      const data = {
        "idDistributeur" : 4
    }
      const res  = await request(app).post("/order/"+id).send(data);
      expect(res.status).toBe(200)
      expect(res.body.data.idDistributeur).toBe(data.idDistributeur)
      done()
    });

    it('should return 400 Bad Request',async (done) => {
      const id = -2 ;
      const data = {
        "idDistributeur" : 4
    }
      const res  = await request(app).post("/order/"+id).send(data);
      expect(res.status).toBe(400)
      done()
      });
  })


  // -- API order Delete /order/:id
  describe('-- API order Delete /order/:id', async () => {
    let id : number;
    beforeEach( async ()=>{
      const data = {
        "dateCommande" : "2023-03-17T15:30:00Z" ,
        "idConsommateur" : 1,
        "idDistributeur" : 1
    }
      const res = await request(app).post("/order").send(data);
      id = res.body.data.idCommande
    })

    it('should return 200 OK',async (done) => {
      const res  = await request(app).delete("/order/"+id)
      expect(res.status).toBe(200)
      done()
    });

    it('should return 400 Bad Request',async (done) => {
      const id = -2 ;
      const res  = await request(app).delete("/order/"+id)
      expect(res.status).toBe(400)
      done()
      });
  })

