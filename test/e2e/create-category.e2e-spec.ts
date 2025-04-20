import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { SQLiteTestDataSource } from 'test/infrastructure/orm/sqlite-test-datasource';
import { createTestApp } from 'test/utils/setup-2e2-app';

describe('POST /categories (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const result = await createTestApp();
    app = result.app;
  });

  afterAll(async () => {
    await app.close();
    await SQLiteTestDataSource.destroy();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a category', async () => {
    const res = await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Nova Categoria' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Nova Categoria');
  });
});
