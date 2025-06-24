const request = require('supertest');
const express = require('express');
const { sequelize } = require('../config/database');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/users', require('../routes/userRoutes'));

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        email: `test-${Date.now()}@example.com`,
        name: 'Test User'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test User');
  });

  it('should return a list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
afterAll(async () => {
  await sequelize.close();
});