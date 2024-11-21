import { Injectable } from '@nestjs/common';
import { VehicleRepository } from '../repository/vehicle-repository.abstract';
import { SearchVehicleDto } from '../dto/search-vehicle.dto';

@Injectable()
export class SearchVehicleService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async searchVehicles(filters: SearchVehicleDto) {
    return await this.vehicleRepository.search(filters);
  }
}
