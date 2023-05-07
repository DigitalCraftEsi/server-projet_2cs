/* eslint-disable no-undef */

import request from 'supertest';
import { app } from "../../index"


// -- API Machine  POST /card
describe('-- API Card  POST /card', async () => {
  let cookies:any;
  beforeAll(async () => {
    const consumerData = {
      "email": "jutos@gmail.com",
      "password": "123qweasd"
    }
    const _res = await request(app).post("/loginconsumer").send(consumerData)
    cookies = _res.headers["set-cookie"]
  })

  const newId = "4122112014267661";
  it('should return 201 OK', async (done) => {
    const data = {
      "cardNumber": newId,
      "expiryMonth": "12",
      "expiryYear": "2030",
      "holderName": "Mohamed Jutos"
    }
    const res = await request(app).post("/card").send(data).set("Cookie", cookies);
    expect(res.status).toBe(201)
    expect(res.body.data.cardNumber).toBe(data.cardNumber)
    expect(res.body.data.expiryMonth).toBe(data.expiryMonth)
    expect(res.body.data.expiryYear).toBe(data.expiryYear)
    expect(res.body.data.holderName).toBe(data.holderName)
    done()
  });

  it('should return 400 Bad Request', async (done) => {
    const data = {
      "cardNumber": "4111111145551142",
      "expiryMonth": "03",
      "expiryYear": "2030",
      "holderName": "Moh jutos guezdia Jutos",
      "idConsommateur": 1
    }
    const res = await request(app).post("/card").send(data).set("Cookie", cookies);
    expect(res.status).toBe(400)
    done()
  });

  afterAll(async () => {
    await request(app).delete('/card/' + newId);
  })
});

// -- API Machine  GET /machine/:id
describe('-- API card  GET /card', async () => {

  let cookies:any;
  beforeAll(async () => {
    const consumerData = {
      "email": "jutos@gmail.com",
      "password": "123qweasd"
    }
    const _res = await request(app).post("/loginconsumer").send(consumerData);
    cookies = _res.headers["set-cookie"]
  })

  it('should return 200 OK', async (done) => {
    const res = await request(app).get(`/card`).set("Cookie", cookies)
    expect(res.status).toBe(200)
    done()
  });

  it('should return 400 Bad Request', async (done) => {
    const res = await request(app).get(`/card`)
    expect(res.status).toBe(401)
    done()
  });

});