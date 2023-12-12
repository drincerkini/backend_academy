import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { OrganizationModule } from '../organization.module';
import { AppModule } from '../../app/app.module';
import { CreateOrganizationDto } from '../dto/create-organization.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/organization (POST), create a new organization', async () => {
    const createDto: CreateOrganizationDto = {
      name: 'End to End test 2',
    };

    const response = await request(app.getHttpServer())
      .post('/organization')
      .send(createDto)
      .expect(HttpStatus.CREATED);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(createDto.name);
  });

  it('/organization (GET), list of organizations', async () => {
    const response = await request(app.getHttpServer())
      .get('/organization')
      .expect(HttpStatus.OK);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/organization (GET), return a specific organization when name is provided as a query', async () => {
    const orgName = 'drin';

    const response = await request(app.getHttpServer())
      .get('/organization')
      .query({ name: orgName })
      .expect(HttpStatus.OK);

    expect(response.body.name).toBe(orgName);
  });
});
