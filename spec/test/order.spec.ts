/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */

import request from 'supertest';
import app from "../../index"
import { AuthDataOfTest } from '../../src/utils/data';
import { onAddOrderHandler } from '../../src/services/orderService';
import { commandeStatus } from '@prisma/client';


// -- API order  GET /order
describe('-- API order  GET /order', async () => {
  let cookies : string;
  beforeAll( async ()=>{

    const _resAuth = await request(app).post("/login").send(AuthDataOfTest.authSADM)
     cookies =_resAuth.headers["set-cookie"]
  })
  it('should return 200 OK',async (done) => {
    const res  = await request(app).get("/order").set("Cookie",cookies)
    expect(res.status).toBe(200)
    done()
  });
});

//-- API order  GET /order/:id
describe('-- API order  GET /order/:id', async () => {
    let cookies : string;

    beforeAll( async ()=>{
      const _resAuth = await request(app).post("/login").send(AuthDataOfTest.authSADM)
      cookies =_resAuth.headers["set-cookie"]
    })
    it('should return 200 OK',async (done) => {
      const id = 1 ;
      const res  = await request(app).get(`/order/${id}`).set("Cookie",cookies)
      expect(res.status).toBe(200)
      expect(res.body.data.idCommande).toBe(id)
      done()
    });

    it('should return 400 Bad Request',async (done) => {
        const id = -2 ;
        const res  = await request(app).get(`/order/${id}`).set('Cookie',cookies)
        expect(res.status).toBe(400)
        done()
      });

  });

//   // -- API order Post /order
//   describe('-- API order Post /order', async () => {

//     let id : number
//     it('should return 200 OK',async (done) => {
//       const data = {
//         "dateCommande" : "2023-03-17T15:30:00.000Z" ,
//         "idConsommateur" : 1,
//         "idDistributeur" : 1
//     }
//       const res  = await request(app).post("/order").send(data);
//       id = res.body.data.idCommande
//       expect(res.status).toBe(200)
//       expect(res.body.data.dateCommande).toBe(data.dateCommande)
//       done()
//     });

//     it('should return 400 Bad Request',async (done) => {
//         const data = {
//             "dateCommande" : "2023-03-17T15:30:00Z" ,
//             // "idConsommateur" : 1,
//             "idDistributeur" : 1
//         }   
//         const res  = await request(app).post("/order").send(data);
//           expect(res.status).toBe(400)
//           done()
//       });
    
//       afterAll( async () => { 
//         await request(app).delete('/order/'+id);
//     } )

//   })

  // -- API order Update /order/:id
  describe('-- API order Update /order/:id', async () => {
    let cookies : string;
    const id : number = 1;
    beforeAll( async ()=>{
    const _resAuth = await request(app).post("/login").send(AuthDataOfTest.authSADM)
       cookies =_resAuth.headers["set-cookie"]
    })
    it('should return 200 OK',async (done) => {
      const data = {
        "idDistributeur" : 4
      }
      const res  = await request(app).post("/order/"+id).send(data).set("Cookie",cookies);
      expect(res.status).toBe(200)
      expect(res.body.data.idDistributeur).toBe(data.idDistributeur)
      done()
    });

    it('should return 400 Bad Request',async (done) => {
      const id = -2 ;
      const data = {
        "idDistributeur" : 4
    }
      const res  = await request(app).post("/order/"+id).send(data).set("Cookie",cookies);
      expect(res.status).toBe(400)
      done()
      });
  })


  // -- API order Delete /order/:id
  describe('-- API order Delete /order/:id', async () => {
    let cookies : string;
    const id : number = 1;
    let order : any
    beforeAll( async ()=>{
    const _resAuth = await request(app).post("/login").send(AuthDataOfTest.authSADM)
       cookies =_resAuth.headers["set-cookie"]
      order = await onAddOrderHandler(new Date(),4,1,commandeStatus.enAttente,20.0,[{"idBoisson" : 1 , "Quantite" : 2 } ,{"idBoisson" : 2 , "Quantite" : 4 }],)
    })

    it('should return 200 OK',async (done) => {
      const res  = await request(app).delete("/order/"+order.idCommande).set("Cookie",cookies)
      expect(res.status).toBe(200)
      done()
    });

    it('should return 400 Bad Request',async (done) => {
      const id = -2 ;
      const res  = await request(app).delete("/order/"+id).set('Cookie',cookies)
      expect(res.status).toBe(400)
      done()
      });
  })

