import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum VehicleStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
  RENTED = 'RENTED',
}

@Entity({ name: 'vehicles' })
export class vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  model: string;

  @Column()
  brand: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'enum', enum: VehicleStatus })
  status: VehicleStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
