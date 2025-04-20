import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Device } from './device';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @OneToMany(() => Device, (device) => device.category, { cascade: ['remove'] })
  devices: Device[];
}
