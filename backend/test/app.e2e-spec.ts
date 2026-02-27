process.env.DATABASE_URL = 'postgresql://booking:booking@localhost:5432/bookingdb';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as supertest from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const request = (supertest as any).default || supertest;

jest.setTimeout(30000);

describe('API Automation (Final Fix)', () => {
  let app: INestApplication;
  let authToken: string; // Hier speichern wir den Token

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideModule(TypeOrmModule)
    .useModule(
      TypeOrmModule.forRoot({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: false,
      }),
    )
    .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  // Wir definieren die Testfälle in einer Funktion, um flexibel auf den Token zuzugreifen
  const getTestCases = () => [
    { method: 'GET', url: '/hotels', query: '?city=Heidenheim', expected: 200 },
    
    // LOGIN ZUERST (damit wir den Token für später haben)
    { 
      method: 'POST', 
      url: '/auth/login', 
      body: { email: 'admin@memorably.de', password: 'hash1' }, 
      expected: 201,
      isLogin: true 
    },

    // BOOKINGS (Korrigierte Parameter: bookingCode statt code)
    { 
      method: 'POST', 
      url: '/bookings', 
      body: { 
        email: 'kunde1@test.de', firstName: 'Max', lastName: 'Mustermann',
        from: '2026-06-01', to: '2026-06-10', howMany: 1, roomIds: [11] 
      }, 
      expected: 201 
    },
    { method: 'GET', url: '/bookings/lookup', query: '?email=kunde1@test.de&bookingCode=7', expected: 200 },
    { method: 'PATCH', url: '/bookings/cancel', query: '?email=kunde1@test.de&bookingCode=7', expected: 200 },

    // OWNER (Jetzt mit Token!)
    { method: 'GET', url: '/owner/hotels', expected: 200, needsAuth: true },
  ];

  getTestCases().forEach((testCase) => {
    it(`${testCase.method} ${testCase.url}`, async () => {
      const fullUrl = `/api/v1${testCase.url}${testCase.query || ''}`.replace('//', '/');
      const server = app.getHttpServer();
      
      let req: any;
      if (testCase.method === 'GET') req = request(server).get(fullUrl);
      else if (testCase.method === 'POST') req = request(server).post(fullUrl).send(testCase.body);
      else if (testCase.method === 'PATCH') req = request(server).patch(fullUrl).send(testCase.body);
      else if (testCase.method === 'DELETE') req = request(server).delete(fullUrl);

      // Falls die Route Auth braucht, Token mitschicken
      if (testCase.needsAuth && authToken) {
        req.set('Authorization', `Bearer ${authToken}`);
      }

      const res = await req;
      
      // Falls das der Login-Test war, Token für die nächsten Tests speichern
      if (testCase.isLogin && res.body.accessToken) {
        authToken = res.body.accessToken;
      }

      if (res.status !== testCase.expected) {
        console.warn(`⚠️ FAIL: ${testCase.method} ${fullUrl} | Status: ${res.status} | Body: ${JSON.stringify(res.body)}`);
      }
      expect(res.status).toBe(testCase.expected);
    });
  });
});