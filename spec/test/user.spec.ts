/* eslint-disable no-undef */

import request from 'supertest';

import app from "../../index"


// -- API Creation of Users  GET /order
describe('-- API order  GET /order', async () => {
  it('should return 200 OK',async (done) => {
    const res  = await request(app).get("/order")
    expect(res.status).toBe(200)
    done()
  });
});