import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { VehicleRepository } from '../repository/vehicle-repository.abstract';
import { PayloadDto } from 'src/users/dto/payload.dto';

@Injectable()
export class CreateVehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async createVehicle(createVehicleDto: CreateVehicleDto, userId: PayloadDto) {
    if (!userId) {
      throw new NotFoundException('User not found');
    }

    return await this.vehicleRepository.create(createVehicleDto, userId);
  }
}
