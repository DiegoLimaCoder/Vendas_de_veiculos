import { Controller, Get, Query } from '@nestjs/common';
import { SearchVehicleDto } from '../dto/search-vehicle.dto';
import { SearchVehicleService } from '../service/search-vehicles.service';

@Controller('vehicles')
export class SearchController {
  constructor(private readonly searchVehicleService: SearchVehicleService) {}

  @Get('search')
  async searchVehicles(@Query() filters: SearchVehicleDto) {
    return await this.searchVehicleService.searchVehicles(filters);
  }
}
