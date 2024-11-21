import { Injectable } from '@nestjs/common';
import { VehicleRepository } from '../repository/vehicle-repository.abstract';

@Injectable()
export class getAllVehiclesService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}
  async getAllVehicles() {
    return await this.vehicleRepository.getAllVehicles();
  }
}
