import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { VehicleStatus } from './create-vehicle.dto';

export class SearchVehicleDto {
  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;

  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  year?: number;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  brand?: string;
}
