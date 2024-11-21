import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { VehicleRepository } from '../repository/vehicle-repository.abstract';

@Injectable()
export class CreateVehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async createVehicle(createVehicleDto: CreateVehicleDto) {
    return await this.vehicleRepository.create(createVehicleDto);
  }
}
