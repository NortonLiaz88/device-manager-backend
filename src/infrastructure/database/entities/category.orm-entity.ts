import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DeviceOrmEntity } from './device.orm-entity';

@Entity('categories')
export class CategoryOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @OneToMany(() => DeviceOrmEntity, (device) => device.category, {
    cascade: ['remove'],
  })
  devices: DeviceOrmEntity[];
}
