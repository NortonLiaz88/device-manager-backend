import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap() {
    try {
      console.log('🔗 Connecting to the database...');
      const isConnected = this.dataSource.isInitialized;
      if (!isConnected) await this.dataSource.initialize();
      console.log('✅ Database connection established');
    } catch (err) {
      console.error('❌ Database connection failed:', err);
    }
  }
}
