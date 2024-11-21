import { InjectRepository } from '@nestjs/typeorm';
import { vehicle } from '../entities/vehicle.entity';
import { Repository } from 'typeorm';
import { VehicleRepository } from './vehicle-repository.abstract';
import { CreateVehicleDto, VehicleStatus } from '../dto/create-vehicle.dto';
import { VehicleResponseDto } from '../dto/vehicle.response.dto';

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

  async getByStatus(
    vehicleStatus: VehicleStatus,
  ): Promise<VehicleResponseDto[]> {
    return await this.vehicleRepository.find({
      where: { status: vehicleStatus },
    });
  }
}
