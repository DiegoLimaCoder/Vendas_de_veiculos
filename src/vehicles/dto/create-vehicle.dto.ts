import {
  IsString,
  IsNumber,
  IsEnum,
  IsInt,
  Length,
  Min,
  Max,
} from 'class-validator';

export enum VehicleStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
  RENTED = 'RENTED',
}

export class CreateVehicleDto {
  @IsString()
  @Length(3, 255)
  title: string;

  @IsString()
  @Length(10, 2000)
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @Length(1, 100)
  model: string;

  @IsString()
  @Length(1, 100)
  brand: string;

  @IsInt()
  @Min(1886)
  @Max(new Date().getFullYear())
  year: number;

  @IsEnum(VehicleStatus)
  status: VehicleStatus;
}
