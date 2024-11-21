import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { vehicle } from '../entities/vehicle.entity';
import { VehicleRepository } from './vehicle-repository.abstract';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { VehicleResponseDto } from '../dto/vehicle.response.dto';
import { SearchVehicleDto } from '../dto/search-vehicle.dto';
import { VehicleSearchQueryBuilder } from './vehicle-search-query-builder'; // Importação corrigida

export class VehicleRepositoryImp implements VehicleRepository {
  constructor(
    @InjectRepository(vehicle)
    private readonly vehicleRepository: Repository<vehicle>,
    private readonly vehicleSearchQueryBuilder: VehicleSearchQueryBuilder, // Classe com nome corrigido
  ) {}

  async create(
    createVehicleDto: CreateVehicleDto,
  ): Promise<VehicleResponseDto> {
    return await this.vehicleRepository.save(createVehicleDto);
  }

  async getAll(): Promise<VehicleResponseDto[]> {
    return await this.vehicleRepository.find();
  }

  async search(filters: SearchVehicleDto): Promise<VehicleResponseDto[]> {
    const query = this.vehicleRepository.createQueryBuilder('vehicle');
    this.vehicleSearchQueryBuilder.buildSearchQuery(query, filters);
    return query.getMany();
  }
}
