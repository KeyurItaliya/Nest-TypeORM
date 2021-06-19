import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: number;

  @Column()
  count: number;

  @DeleteDateColumn()
  @Exclude()
  deleted: Date;
}
