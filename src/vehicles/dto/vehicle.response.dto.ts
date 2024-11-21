import { Expose } from 'class-transformer';
import { VehicleStatus } from './create-vehicle.dto';

export class VehicleResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  model: string;

  @Expose()
  brand: string;

  @Expose()
  year: number;

  @Expose()
  status: VehicleStatus;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
