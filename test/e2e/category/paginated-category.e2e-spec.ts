import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { SQLiteTestDataSource } from 'test/infrastructure/orm/sqlite-test-datasource';
import { createTestApp } from 'test/utils/setup-2e2-app';

describe('GET /categories/paginated (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const result = await createTestApp();
    app = result.app;
  });

  afterAll(async () => {
    await app.close();
    await SQLiteTestDataSource.destroy();
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
