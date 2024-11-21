import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { SearchVehicleDto } from '../dto/search-vehicle.dto';
import { VehicleResponseDto } from '../dto/vehicle.response.dto';

export abstract class VehicleRepository {
  abstract create(
    createVehicleDto: CreateVehicleDto,
  ): Promise<VehicleResponseDto>;

  abstract getAll(): Promise<VehicleResponseDto[]>;

  abstract search(filters: SearchVehicleDto): Promise<VehicleResponseDto[]>;
}
