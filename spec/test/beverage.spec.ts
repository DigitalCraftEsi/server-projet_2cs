/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-undef */

import request from 'supertest';
import app from "../../index"
import { AuthDataOfTest } from '../../src/utils/data';


// -- API Beverage  GET /beverage
describe('-- API Beverage  GET /machine', async () => {
  let cookies : string;
  beforeAll( async ()=>{
    const _resAuth = await request(app).post("/login").send(AuthDataOfTest.authSADM)
     cookies =_resAuth.headers["set-cookie"]
  })
  it('should return 200 OK',async (done) => {
    const res  = await request(app).post("/beverage").send({distUID : "1"}).set("Cookie",cookies)
    expect(res.status).toBe(200)
    done()
  });
});

// -- API Beverage  GET POST /beverage/:id
describe('-- API beverage  GET /beverage/:id', async () => {
    const id : number = 1;
    let cookies : string;
    beforeAll( async ()=>{
      const _resAuth = await request(app).post("/login").send(AuthDataOfTest.authSADM)
      cookies =_resAuth.headers["set-cookie"]
    })
    it('should return 200 OK',async (done) => {
      const res  = await request(app).get(`/beverage/${id}`).send(AuthDataOfTest.authSADM)
      expect(res.status).toBe(200)
      expect(res.body.data.idBoisson).toBe(id)
      done()
    });

    it('should return 400 Bad Request',async (done) => {
        const id = -2 ;
        const res  = await request(app).get(`/beverage/${id}`)
        expect(res.status).toBe(400)
        done()
    });
    afterAll( async() =>{
         //await request(app).delete("/beverage/"+id)
    })

  });

//   // -- API beverage Post /beverage
//   describe('-- API beverage Post /beverage', async () => {

//     let id : number
//     it('should return 200 OK',async (done) => {
//         const data = {
//             "nomBoisson" : "COCA",
//             "tarif" : 20.00 ,
//             "idDistributeur" : 1
//         }
//       const res  = await request(app).post("/beverage").send(data);
//       expect(res.status).toBe(200)
//       id = res.body.data.idBoisson
//       expect(res.body.data.nomBoisson).toBe(data.nomBoisson)
//       expect(res.body.data.tarif).toBe(data.tarif)
//       expect(res.body.data.idDistributeur).toBe(data.idDistributeur)
//       done()
//     });

//     it('should return 400 Bad Request',async (done) => {
//         const data = {
//             // "nomBoisson" : "COCA",
//             "tarif" : 20.00 ,
//             "idDistributeur" : 1
//         }
//         const res  = await request(app).post("/beverage").send(data);
//           expect(res.status).toBe(400)
//           done()
//       });

//     afterAll( async () => { 
//         await request(app).delete('/beverage/'+id);
//     } )

//   })

//   // -- API beverage Update /beverage/:id
//   describe('-- API beverage Update /beverage/:id', async () => {

//     let id : number;
//     beforeAll( async ()=>{
//         const data = {
//             "nomBoisson" : "COCA",
//             "tarif" : 20.00 ,
//             "idDistributeur" : 1
//         }
//       const res = await request(app).post("/beverage").send(data);
//       id = res.body.data.idBoisson
//     })

//     it('should return 200 OK',async (done) => {
//         const data = {
//             // "nomBoisson" : "COCA",
//             "tarif" : 80.00 ,
//             // "idDistributeur" : 1
//         }
//       const res  = await request(app).post("/beverage/"+id).send(data);
//       expect(res.status).toBe(200)
//       expect(res.body.data.tarif).toEqual(data.tarif)
//       done()
//     });

//     it('should return 400 Bad Request',async (done) => {
//       const id = -2 ;
//       const data = {
//         // "nomBoisson" : "COCA",
//         "tarif" : 80.00 ,
//         // "idDistributeur" : 1
//     }
//       const res  = await request(app).post("/beverage/"+id).send(data);
//       expect(res.status).toBe(400)
//       done()
//       });

//       afterAll(async() => {
//         await request(app).delete('/beverage/'+id)
//       })
//   })

  
//   // -- API beverage Delete /beverage/:id
//   describe('-- API beverage Delete /beverage/:id', async () => {
//     let id : number;
//     beforeEach( async ()=>{
//         const data = {
//             "nomBoisson" : "COCA",
//             "tarif" : 20.00 ,
//             "idDistributeur" : 1
//         }
//       const res = await request(app).post("/beverage").send(data);
//       id = res.body.data.idBoisson
//     })

//     it('should return 200 OK',async (done) => {
//       const res  = await request(app).delete("/beverage/"+id)
//       expect(res.status).toBe(200)
//       done()
//     });

//     it('should return 400 Bad Request',async (done) => {
//       const id = -2 ;
//       const res  = await request(app).delete("/beverage/"+id)
//       expect(res.status).toBe(400)
//       done()
//       });
//   })

