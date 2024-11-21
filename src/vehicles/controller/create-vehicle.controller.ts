import { Body, Controller, Post } from '@nestjs/common';
import { CreateVehicleService } from '../service/create-vehicle.service';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';

@Controller('vehicles')
export class CreateVehicleController {
  constructor(private readonly createVehicleService: CreateVehicleService) {}

  @Post()
  async createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    return await this.createVehicleService.createVehicle(createVehicleDto);
  }
}
