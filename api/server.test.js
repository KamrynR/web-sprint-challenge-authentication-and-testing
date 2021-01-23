const supertest = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

afterAll(async () => {
  await db.destroy()
})

describe('tests server', () => {
  // /POST /api/auth/register
  it('tests register to make new user', async () => {
    const res = await supertest(server)
      .post('/api/auth/register')
      .send({username: 'user94', password: 'password99',})
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe('application/json')
    expect(res.body.message).toBe('User Created Successfully')
  })

  it('tests register for taken username', async () => {
      const res = await supertest(server)
          .post('/api/auth/register')
          .send({username: 'user99', password: 'password99',})
      expect(res.statusCode).toBe(409)
      expect(res.type).toBe('application/json')
      expect(res.body.message).toBe('username taken')
  })

  // /POST /api/auth/login
  it('tests login for successful login', async () => {
    const res = await supertest(server)
        .post('/api/auth/login')
        .send({username: 'user99', password: 'password99',})
    expect(res.type).toBe('application/json')
    expect(res.body.message).toBe('welcome, user99')
  })

  it('tests login for unsuccessful login', async () => {
    const res = await supertest(server)
        .post('/api/auth/login')
        .send({username: 'user99', password: 'password',})
    expect(res.type).toBe('application/json')
    expect(res.body.message).toBe('invalid credentials')
  })
})
