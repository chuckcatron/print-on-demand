import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  externalId: string;

  @Column()
  name: string;

  @Column()
  variants: number;

  @Column()
  synced: number;

  @Column()
  thumbnailUrl: string;

  @Column()
  isIgnored: boolean;

  @Column({ default: 0 })
  price: number;

  @Column({ default: '' })
  description: string;
}
