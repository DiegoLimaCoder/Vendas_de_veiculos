import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { vehicle } from '../entities/vehicle.entity';
import { VehicleRepository } from './vehicle-repository.abstract';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { VehicleResponseDto } from '../dto/vehicle.response.dto';
import { SearchVehicleDto } from '../dto/search-vehicle.dto';

export class VehicleRepositoryImp implements VehicleRepository {
  constructor(
    @InjectRepository(vehicle)
    private readonly vehicleRepository: Repository<vehicle>,
    private readonly vehicleSearchQueryBuilder: vehicleSearchQueryBuilder,
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

export class vehicleSearchQueryBuilder {
  buildSearchQuery(
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
      {
        key: 'minPrice',
        condition: 'vehicle.price <= :minPrice',
        value: filters.minPrice,
      },
      {
        key: 'maxPrice',
        condition: 'vehicle.price >= :maxPrice',
        value: filters.maxPrice,
      },
    ];

    conditions.forEach(({ condition, value }) => {
      if (value !== undefined) {
        query.andWhere(condition, { [condition]: value });
      }
    });

    return query;
  }
}
