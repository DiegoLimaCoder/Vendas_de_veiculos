import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN,
  CUSTOMER,
}

/**
 * Entidade que representa um usuário no sistema.
 */
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @Column()
  password: string;

  @Column({ type: 'boolean', default: false })
  checked?: boolean;

  @Column({ unique: true, nullable: true, default: () => 'uuid_generate_v4()' })
  validationToken?: string;

  @Column({ unique: true, nullable: true })
  resetToken?: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.userId)
  vehicles: Vehicle[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
