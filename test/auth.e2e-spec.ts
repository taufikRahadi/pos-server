import { HttpStatus, INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { AppModule } from "./../src/application/app.module"
import * as request from 'supertest'

describe("Authentication (e2e)", () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  describe('Login', () => {
    it('It Should Return JWT', async () => {
      console.log(app.getHttpServer())
      const req = await request(app.getHttpServer())
        .post('/api/v1/auth')
        .send({
          username: 'taufikrahadi',
          password: 'password'
        })
        // .expect(HttpStatus.OK)
      console.log(req)

      expect(req.body)
        .toMatchObject({
          username: expect.any(String),
          fullname: expect.any(String),
          role: expect.any(String),
          accessToken: expect.any(String)
        })
      
      expect(req.body.accessToken)
        .toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
    })
  })

  afterAll(async () => {
    await app.close()
  })
})