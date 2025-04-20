import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.devices, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ length: 16 })
  color: string;

  @Column({ name: 'part_number', type: 'int' })
  partNumber: number;
}
