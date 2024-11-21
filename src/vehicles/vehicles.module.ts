import { Module } from '@nestjs/common';
import { CreateVehicleService } from './service/create-vehicle.service';
import { CreateVehicleController } from './controller/create-vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { vehicle } from './entities/vehicle.entity';
import { VehicleRepository } from './repository/vehicle-repository.abstract';
import { vehicleRepositoryImp } from './repository/vehicle-repository.impl';
import { GetAllVehiclesController } from './controller/get-all-vehicles.controller';
import { getAllVehiclesService } from './service/get-all-vehicles.service';

import { SearchVehicleService } from './service/search-vehicles.service';
import { SearchController } from './controller/search-vehicle.controller';

@Module({
  imports: [TypeOrmModule.forFeature([vehicle])],
  controllers: [
    CreateVehicleController,
    GetAllVehiclesController,
    SearchController,
  ],
  providers: [
    CreateVehicleService,
    getAllVehiclesService,
    SearchVehicleService,
    {
      provide: VehicleRepository,
      useClass: vehicleRepositoryImp,
    },
  ],
})
export class VehiclesModule {}