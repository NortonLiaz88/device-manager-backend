import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { SQLiteTestDataSource } from 'test/infrastructure/orm/sqlite-test-datasource';
import { createTestApp } from 'test/utils/setup-2e2-app';

describe('CategoryController - Update and Delete (e2e)', () => {
  let app: INestApplication;
  let createdId: number;

  beforeAll(async () => {
    const result = await createTestApp();
    app = result.app;
  });

  afterAll(async () => {
    await app.close();
    await SQLiteTestDataSource.destroy();
  });

  it('should create a category to test update and delete', async () => {
    const res = await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Original Category' });

    expect(res.status).toBe(201);
    createdId = res.body.id;
    expect(createdId).toBeDefined();
  });

  it('should update the category name', async () => {
    const res = await request(app.getHttpServer())
      .put(`/categories/${createdId}`)
      .send({ name: 'Updated Category' });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated Category');
    expect(res.body.id).toBe(createdId);
  });

  it('should delete the category', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/categories/${createdId}`,
    );
    expect(res.status).toBe(200);
  });

  it('should return 404 when trying to get the deleted category', async () => {
    const res = await request(app.getHttpServer()).get(
      `/categories/${createdId}`,
    );
    expect(res.status).toBe(404);
  });
});
