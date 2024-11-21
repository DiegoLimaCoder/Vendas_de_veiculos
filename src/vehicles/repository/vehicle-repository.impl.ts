import { InjectRepository } from '@nestjs/typeorm';
import { vehicle } from '../entities/vehicle.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { VehicleRepository } from './vehicle-repository.abstract';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { VehicleResponseDto } from '../dto/vehicle.response.dto';
import { SearchVehicleDto } from '../dto/search-vehicle.dto';

export class vehicleRepositoryImp implements VehicleRepository {
  constructor(
    @InjectRepository(vehicle)
    private readonly vehicleRepository: Repository<vehicle>,
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
    this.buildSearchQuery(query, filters);
    return query.getMany();
  }

  private buildSearchQuery(
    query: SelectQueryBuilder<vehicle>,
    filters: SearchVehicleDto,
  ): SelectQueryBuilder<vehicle> {
    const conditions = [
      {
        key: 'status',
        condition: 'vehicle.status = :status',
        value: filters.status,
      },
      {
        key: 'model',
        condition: 'vehicle.model ILIKE :model',
        value: filters.model ? `%${filters.model}%` : undefined,
      },
      { key: 'year', condition: 'vehicle.year = :year', value: filters.year },
      {
        key: 'brand',
        condition: 'vehicle.brand ILIKE :brand',
        value: filters.brand ? `%${filters.brand}%` : undefined,
      },
    ];

    conditions.forEach(({ condition, value }, index: number) => {
      if (value !== undefined) {
        query.andWhere(condition, { [conditions[index].key]: value });
      }
    });

    return query;
  }
}
