import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import request from 'supertest';
import { DataSource } from 'typeorm';

describe('GET /categories/paginated (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    dataSource = moduleRef.get(DataSource);
    await dataSource.synchronize(true);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return paginated categories using default params', async () => {
    // cria alguns dados
    await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Category A' });

    await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Category B' });

    const res = await request(app.getHttpServer()).get('/categories/paginated');

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(2);
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(10);
    expect(res.body.total).toBeGreaterThanOrEqual(2);
  });

  it('should return filtered results by name', async () => {
    const res = await request(app.getHttpServer())
      .get('/categories/paginated')
      .query({ name: 'Category A' });

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].name).toBe('Category A');
  });

  it('should return sorted results in descending order', async () => {
    const res = await request(app.getHttpServer())
      .get('/categories/paginated')
      .query({ orderBy: 'name', orderDir: 'DESC' });

    expect(res.status).toBe(200);
    expect(res.body.data[0].name).toBe('Category B'); // B vem antes de A em DESC
  });

  it('should return specific result by id', async () => {
    const all = await request(app.getHttpServer()).get('/categories/paginated');
    expect(all.status).toBe(200);
    expect(all.body.data?.length).toBeGreaterThan(0);

    const targetId = all.body.data[0]?.id;

    const res = await request(app.getHttpServer())
      .get('/categories/paginated')
      .query({ id: targetId });

    expect(res.status).toBe(200);
    expect(res.body.data[0].id).toBe(targetId);
  });
});
