import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { SQLiteTestDataSource } from 'test/infrastructure/orm/sqlite-test-datasource';

export async function createTestApp(): Promise<{
  app: INestApplication;
}> {
  // Inicializa o banco
  if (!SQLiteTestDataSource.isInitialized) {
    await SQLiteTestDataSource.initialize();
  }

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [TypeOrmModule.forRoot(SQLiteTestDataSource.options), AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.init();

  return { app };
}
