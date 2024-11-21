import { CreateVehicleDto, VehicleStatus } from '../dto/create-vehicle.dto';
import { VehicleResponseDto } from '../dto/vehicle.response.dto';

export abstract class VehicleRepository {
  abstract createVehicle(
    createVehicleDto: CreateVehicleDto,
  ): Promise<VehicleResponseDto>;

  abstract getAllVehicles(): Promise<VehicleResponseDto[]>;

  abstract getByStatusVehicles(
    vehicleStatus: VehicleStatus,
  ): Promise<VehicleResponseDto[]>;
}
