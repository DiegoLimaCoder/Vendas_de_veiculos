import { Expose, Type } from 'class-transformer';
import { VehicleStatus } from './create-vehicle.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

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

  @Expose()
  userId: string;

  @Type(() => UserResponseDto)
  @Expose()
  user: UserResponseDto;
}
