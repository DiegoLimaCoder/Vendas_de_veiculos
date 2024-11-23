import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { VehicleRepository } from './vehicle-repository.abstract';
import { VehicleResponseDto } from '../dto/vehicle.response.dto';
import { SearchVehicleDto } from '../dto/search-vehicle.dto';
import { VehicleSearchQueryBuilder } from './vehicle-search-query-builder'; // Importação corrigida
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { plainToInstance } from 'class-transformer';
import { PayloadDto } from 'src/users/dto/payload.dto';

export class VehicleRepositoryImp implements VehicleRepository {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private readonly vehicleSearchQueryBuilder: VehicleSearchQueryBuilder, // Classe com nome corrigido
  ) {}
  async create(
    createVehicleDto: CreateVehicleDto,
    userId: PayloadDto,
  ): Promise<VehicleResponseDto> {
    const vehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      userId: userId.sub,
    });

    const savedVehicle = await this.vehicleRepository.save(vehicle);

    return plainToInstance(VehicleResponseDto, savedVehicle, {
      excludeExtraneousValues: true,
    });
  }

  async getAll(): Promise<VehicleResponseDto[]> {
    const vehicles = await this.vehicleRepository.find({
      relations: ['user'],
    });

    return plainToInstance(VehicleResponseDto, vehicles, {
      excludeExtraneousValues: true,
    });
  }

  async search(filters: SearchVehicleDto): Promise<VehicleResponseDto[]> {
    const query = this.vehicleRepository.createQueryBuilder('vehicle');
    this.vehicleSearchQueryBuilder.buildSearchQuery(query, filters);
    return query.getMany();
  }
}
