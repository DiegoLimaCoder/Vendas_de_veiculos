import { Controller, Get } from '@nestjs/common';
import { getAllVehiclesService } from '../service/get-all-vehicles.service';

@Controller('vehicles')
export class GetAllVehiclesController {
  constructor(private readonly getAllVehiclesService: getAllVehiclesService) {}

  @Get()
  async getAllVehicles() {
    return await this.getAllVehiclesService.getAllVehicles();
  }
}
