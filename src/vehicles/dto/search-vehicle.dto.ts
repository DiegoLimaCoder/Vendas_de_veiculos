import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { VehicleStatus } from './create-vehicle.dto';
import { Transform } from 'class-transformer';

export class SearchVehicleDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;

  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  @Transform(({ value }) => parseInt(value, 10))
  year?: number;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  minPrice?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  maxPrice?: number;
}
