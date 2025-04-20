import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CategoryOrmEntity } from './category.orm-entity';

@Entity('devices')
export class DeviceOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CategoryOrmEntity, (category) => category.devices, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryOrmEntity;

  @Column({ length: 16 })
  color: string;

  @Column({ name: 'part_number', type: 'int' })
  partNumber: number;
}
