import { CreateVehicleDto, VehicleStatus } from '../dto/create-vehicle.dto';
import { VehicleResponseDto } from '../dto/vehicle.response.dto';

export abstract class VehicleRepository {
  abstract create(
    createVehicleDto: CreateVehicleDto,
  ): Promise<VehicleResponseDto>;

  abstract getAll(): Promise<VehicleResponseDto[]>;

  abstract getByStatus(
    vehicleStatus: VehicleStatus,
  ): Promise<VehicleResponseDto[]>;
}
