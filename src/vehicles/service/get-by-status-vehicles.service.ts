import { Injectable } from '@nestjs/common';
import { VehicleRepository } from '../repository/vehicle-repository.abstract';
import { VehicleStatus } from '../dto/create-vehicle.dto';

@Injectable()
export class GetByStatusVehiclesService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async getByStatusVehicles(status: VehicleStatus) {
    return await this.vehicleRepository.getByStatusVehicles(status);
  }
}
