import { Controller, Get, Param } from '@nestjs/common';
import { GetByStatusVehiclesService } from '../service/get-by-status-vehicles.service';
import { VehicleStatus } from '../dto/create-vehicle.dto';

@Controller('vehicles')
export class GetByStatusVehiclesController {
  constructor(
    private readonly getByStatusVehiclesService: GetByStatusVehiclesService,
  ) {}

  @Get('status/:status')
  async getByStatusVehicles(@Param('status') status: VehicleStatus) {
    return await this.getByStatusVehiclesService.getByStatusVehicles(status);
  }
}
